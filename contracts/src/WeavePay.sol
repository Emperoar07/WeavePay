// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract WeavePay {
    enum InvoiceStatus {
        Unpaid,
        Paid,
        Canceled
    }

    struct Invoice {
        address merchant;
        address payer;
        address token;
        uint256 amount;
        uint256 feeBps;
        InvoiceStatus status;
        string metadataURI;
        uint64 createdAt;
        uint64 paidAt;
    }

    uint256 public constant MAX_FEE_BPS = 500;
    address public owner;
    address public feeRecipient;
    uint256 public invoiceCount;
    uint256 public protocolFeeBps = 100;

    mapping(uint256 invoiceId => Invoice invoice) public invoices;

    event InvoiceCreated(
        uint256 indexed invoiceId,
        address indexed merchant,
        address indexed token,
        uint256 amount,
        string metadataURI
    );
    event InvoicePaid(
        uint256 indexed invoiceId,
        address indexed payer,
        uint256 merchantAmount,
        uint256 protocolFee
    );
    event InvoiceCanceled(uint256 indexed invoiceId);
    event ProtocolFeeUpdated(uint256 feeBps);
    event FeeRecipientUpdated(address feeRecipient);

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }

    constructor(address initialFeeRecipient) {
        require(initialFeeRecipient != address(0), "FEE_RECIPIENT_ZERO");
        owner = msg.sender;
        feeRecipient = initialFeeRecipient;
    }

    function createInvoice(
        address merchant,
        address token,
        uint256 amount,
        string calldata metadataURI
    ) external returns (uint256 invoiceId) {
        require(merchant != address(0), "MERCHANT_ZERO");
        require(amount > 0, "AMOUNT_ZERO");

        invoiceId = ++invoiceCount;
        invoices[invoiceId] = Invoice({
            merchant: merchant,
            payer: address(0),
            token: token,
            amount: amount,
            feeBps: protocolFeeBps,
            status: InvoiceStatus.Unpaid,
            metadataURI: metadataURI,
            createdAt: uint64(block.timestamp),
            paidAt: 0
        });

        emit InvoiceCreated(invoiceId, merchant, token, amount, metadataURI);
    }

    function payInvoice(uint256 invoiceId) external payable {
        Invoice storage invoice = invoices[invoiceId];
        require(invoice.merchant != address(0), "INVOICE_NOT_FOUND");
        require(invoice.status == InvoiceStatus.Unpaid, "INVOICE_NOT_UNPAID");

        uint256 fee = (invoice.amount * invoice.feeBps) / 10_000;
        uint256 merchantAmount = invoice.amount - fee;

        invoice.payer = msg.sender;
        invoice.status = InvoiceStatus.Paid;
        invoice.paidAt = uint64(block.timestamp);

        if (invoice.token == address(0)) {
            require(msg.value == invoice.amount, "INVALID_NATIVE_VALUE");
            _sendNative(invoice.merchant, merchantAmount);
            _sendNative(feeRecipient, fee);
        } else {
            require(msg.value == 0, "NATIVE_NOT_ACCEPTED");
            require(IERC20(invoice.token).transferFrom(msg.sender, invoice.merchant, merchantAmount), "MERCHANT_TRANSFER_FAILED");
            require(IERC20(invoice.token).transferFrom(msg.sender, feeRecipient, fee), "FEE_TRANSFER_FAILED");
        }

        emit InvoicePaid(invoiceId, msg.sender, merchantAmount, fee);
    }

    function cancelInvoice(uint256 invoiceId) external {
        Invoice storage invoice = invoices[invoiceId];
        require(invoice.merchant == msg.sender || msg.sender == owner, "NOT_AUTHORIZED");
        require(invoice.status == InvoiceStatus.Unpaid, "INVOICE_NOT_UNPAID");

        invoice.status = InvoiceStatus.Canceled;
        emit InvoiceCanceled(invoiceId);
    }

    function setProtocolFeeBps(uint256 nextFeeBps) external onlyOwner {
        require(nextFeeBps <= MAX_FEE_BPS, "FEE_TOO_HIGH");
        protocolFeeBps = nextFeeBps;
        emit ProtocolFeeUpdated(nextFeeBps);
    }

    function setFeeRecipient(address nextFeeRecipient) external onlyOwner {
        require(nextFeeRecipient != address(0), "FEE_RECIPIENT_ZERO");
        feeRecipient = nextFeeRecipient;
        emit FeeRecipientUpdated(nextFeeRecipient);
    }

    function _sendNative(address to, uint256 amount) private {
        if (amount == 0) return;
        (bool ok, ) = payable(to).call{value: amount}("");
        require(ok, "NATIVE_TRANSFER_FAILED");
    }
}
