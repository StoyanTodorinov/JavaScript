let receiptService = (() => {
    function getActiveReceipt(userId) {
        let endpoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`;
        return requester.get('appdata', endpoint);
    }

    function createReceipt(receipt) {
        return requester.post('appdata', 'receipts', 'kinvey', receipt);
    }

    function getMyReceipts(userId) {
        let endpoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`;
        return requester.get('appdata', endpoint);
    }

    function commitReceipt(receiptId, receipt) {
        return requester.update('appdata', 'receipts/' + receiptId, 'kinvey', receipt);
    }

    return {
        getActiveReceipt,
        createReceipt,
        getMyReceipts,
        commitReceipt
    }
})();