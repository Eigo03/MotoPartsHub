app.service("MotoPartsHubSystemService", function ($http) {

    // Cache-busting + disable cache headers for chart endpoints
    function chartRequest(url) {
        return $http({
            method: 'GET',
            url: url + '?_=' + new Date().getTime(),
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: false
        });
    }

    this.getPartsPerCategory = function () {
        return chartRequest('/Admin/GetPartsPerCategory');
    };

    this.getPartsPerShop = function () {
        return chartRequest('/Admin/GetPartsPerShop');
    };

    this.getStockStatusSummary = function () {
        return chartRequest('/Admin/GetStockStatusSummary');
    };

    this.getStockChangesOverTime = function () {
        return chartRequest('/Admin/GetStockChangesOverTime');
    };

});