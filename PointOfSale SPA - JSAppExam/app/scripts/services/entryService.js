let entryService = (() => {
    function getEntriesByReceiptId(receiptId) {
        let endpoint = `entries?query={"receiptId":"${receiptId}"}`;
        return requester.get('appdata', endpoint);
    }

    function addEntry(entry) {
        return requester.post('appdata', 'entries', 'kinvey', entry);
    }

    function deleteEntry(entryId) {
        return requester.remove('appdata', 'entries/' + entryId, 'kinvey');

    }

    return {
        getEntriesByReceiptId,
        addEntry,
        deleteEntry
    }
})();