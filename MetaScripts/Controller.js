app.controller("MotoPartsHubController", function ($scope, $http, MotoPartsHubSystemService) {

    //  regs
    $scope.user = {};
    $scope.login = {};
    $scope.isRegistered = false;
    $scope.showLoginBtn = false;
    $scope.showPass = false;
    $scope.showConfirmPass = false;

    var params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "login") { $scope.isRegistered = true; }

    $scope.numbersOnly = function (event) {
        var charCode = event.which || event.keyCode;
        if (charCode < 48 || charCode > 57) event.preventDefault();
    };

    $scope.register = function () {
        if (!$scope.user.fname || !$scope.user.lname || !$scope.user.phone ||
            !$scope.user.username || !$scope.user.password || !$scope.user.confirmPassword) {
            Swal.fire({ icon: 'warning', title: 'Incomplete Form', text: 'Please fill up all fields.', confirmButtonColor: '#bf360c' });
            return;
        }
        if ($scope.user.password !== $scope.user.confirmPassword) {
            Swal.fire({ icon: 'error', title: 'Password Mismatch', text: 'Passwords do not match!', confirmButtonColor: '#bf360c' });
            return;
        }
        $http.post('/Admin/RegisterUser', {
            FirstName: $scope.user.fname,
            LastName: $scope.user.lname,
            Phone: $scope.user.phone,
            Username: $scope.user.username,
            Password: $scope.user.password
        }).then(function (res) {
            if (res.data.success) {
                Swal.fire({ icon: 'success', title: 'Registered!', text: res.data.message, confirmButtonColor: '#bf360c' });
                $scope.showLoginBtn = true;
                $scope.user = {};
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
            }
        });
    };

    $scope.goToLogin = function () { $scope.isRegistered = true; $scope.showLoginBtn = false; };
    $scope.goToRegister = function () { $scope.isRegistered = false; $scope.login = {}; };
    $scope.cancelFunc = function () { $scope.user = {}; };

    //  login
    $scope.checkLogin = function () {
        if ($scope.login.username === "admin" && $scope.login.password === "admin123") {
            sessionStorage.setItem("AdminLoggedIn", "true");
            sessionStorage.setItem("LoggedInUser", JSON.stringify({ Name: "Administrator", Username: "admin", RoleId: 1 }));
            Swal.fire({ icon: 'success', title: 'Welcome, Admin!', confirmButtonColor: '#bf360c', timer: 1500, showConfirmButton: false })
                .then(function () { window.location.href = "/Admin/AdminDashboard"; });
            return;
        }
        $http.post('/Admin/Login', { username: $scope.login.username, password: $scope.login.password })
            .then(function (res) {
                if (res.data.success) {
                    var u = res.data.data;
                    var userData = { Name: u.FirstName + " " + u.LastName, Username: u.Username, UserId: u.UserId, RoleId: u.RoleId };
                    sessionStorage.setItem("LoggedInUser", JSON.stringify(userData));
                    Swal.fire({ icon: 'success', title: 'Welcome!', text: 'Welcome, ' + userData.Name + '!', confirmButtonColor: '#bf360c', timer: 1500, showConfirmButton: false })
                        .then(function () { window.location.href = "/Rider/DashboardPage"; });
                } else {
                    Swal.fire({ icon: 'error', title: 'Login Failed', text: res.data.message, confirmButtonColor: '#bf360c' });
                }
            });
    };

    // SESSION
    $scope.loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser")) || { Name: "Guest", Username: "guest" };

    $scope.logout = function () {
        Swal.fire({
            icon: 'question', title: 'Logout', text: 'Are you sure you want to logout?',
            confirmButtonColor: '#bf360c', showCancelButton: true, cancelButtonColor: '#757575',
            confirmButtonText: 'Yes, logout'
        }).then(function (result) {
            if (result.isConfirmed) {
                sessionStorage.removeItem("LoggedInUser");
                sessionStorage.removeItem("AdminLoggedIn");
                window.location.href = "/Moto/LandingPage";
            }
        });
    };

    $scope.adminLogout = function () {
        Swal.fire({
            icon: 'question', title: 'Logout', text: 'Exit admin panel?',
            confirmButtonColor: '#bf360c', showCancelButton: true, cancelButtonColor: '#757575',
            confirmButtonText: 'Yes, logout'
        }).then(function (result) {
            if (result.isConfirmed) {
                sessionStorage.removeItem("AdminLoggedIn");
                sessionStorage.removeItem("LoggedInUser");
                window.location.href = "/Moto/LandingPage";
            }
        });
    };

    //  share data
    $scope.parts = [];
    $scope.categories = ["All"];
    $scope.dbCategories = [];
    $scope.dbShops = [];
    $scope.shops = [];
    $scope.userArray = [];
    $scope.inquiries = [];
    $scope.stockLogs = [];

    function getCategoryName(id) {
        var c = $scope.dbCategories.find(function (x) { return x.CategoryId === id; });
        return c ? c.CategoryName : "Unknown";
    }
    function getShopName(id) {
        var s = $scope.dbShops.find(function (x) { return x.ShopId === id; });
        return s ? s.ShopName : "Unknown";
    }

    function mapPart(p) {
        return {
            id: p.PartId, PartId: p.PartId,
            name: p.PartName, PartName: p.PartName,
            sku: p.SKU, SKU: p.SKU,
            brand: p.Brand, Brand: p.Brand,
            category: getCategoryName(p.CategoryId), CategoryId: p.CategoryId,
            shop: getShopName(p.ShopId), ShopId: p.ShopId,
            price: p.Price, Price: p.Price,
            stock: p.Stock, Stock: p.Stock,
            shortDesc: p.ShortDesc, ShortDesc: p.ShortDesc,
            icon: "settings", specs: {}, features: []
        };
    }

    function loadAll() {
        $http.get('/Admin/GetCategories').then(function (res) {
            if (res.data.success) {
                $scope.dbCategories = res.data.data;
                $scope.categories = ["All"];
                res.data.data.forEach(function (c) { $scope.categories.push(c.CategoryName); });
            }
            $http.get('/Admin/GetShops').then(function (res2) {
                if (res2.data.success) {
                    $scope.dbShops = res2.data.data.filter(function (s) { return s.IsActive === 1; });
                    $scope.shops = $scope.dbShops;
                }
                $http.get('/Admin/GetParts').then(function (res3) {
                    if (res3.data.success) {
                        $scope.parts = res3.data.data.map(mapPart);
                    }
                });
            });
        });
        $http.get('/Admin/GetUsers').then(function (res) {
            if (res.data.success) {
                $scope.userArray = res.data.data.map(function (u) {
                    return { Id: u.UserId, UserId: u.UserId, Name: u.FirstName + " " + u.LastName, Username: u.Username, Phone: u.Phone, IsActive: u.IsActive };
                });
            }
        });
        $http.get('/Admin/GetInquiries').then(function (res) {
            if (res.data.success) { $scope.inquiries = res.data.data; }
        });
        $http.get('/Admin/GetStockLogs').then(function (res) {
            if (res.data.success) { $scope.stockLogs = res.data.data; }
        });
    }

    loadAll();

    function noCache(url) {
        return url + '?_=' + new Date().getTime();
    }

    function reloadCategories() {
        return $http.get(noCache('/Admin/GetCategories')).then(function (res) {
            if (res.data.success) {
                $scope.dbCategories = res.data.data;
                $scope.categories = ["All"];
                res.data.data.forEach(function (c) {
                    $scope.categories.push(c.CategoryName);
                });
            }
            return res;
        });
    }

    function reloadShops() {
        return $http.get(noCache('/Admin/GetShops')).then(function (res) {
            if (res.data.success) {
                $scope.dbShops = res.data.data.filter(function (s) {
                    return s.IsActive === 1;
                });
                $scope.shops = $scope.dbShops;
            }
            return res;
        });
    }

    function reloadParts() {
        return $http.get(noCache('/Admin/GetParts')).then(function (res) {
            if (res.data.success) {
                $scope.parts = res.data.data.map(mapPart);
            }
            return res;
        });
    }

    function reloadStockLogs() {
        return $http.get(noCache('/Admin/GetStockLogs')).then(function (res) {
            if (res.data.success) {
                $scope.stockLogs = res.data.data;
            }
            return res;
        });
    }

    function reloadReportSummary() {
        return $http.get(noCache('/Admin/GetReportSummary')).then(function (res) {
            if (res.data.success) {
                $scope.reportData = res.data;
            }
            return res;
        });
    }

    //  catalog
    $scope.selectedCategory = "All";
    $scope.searchQuery = "";
    $scope.selectedPart = null;
    $scope.sortOption = "name";

    $scope.selectCategory = function (cat) { $scope.selectedCategory = cat; };

    $scope.filteredParts = function () {
        return $scope.parts.filter(function (p) {
            var matchCat = $scope.selectedCategory === "All" || p.category === $scope.selectedCategory;
            var q = ($scope.searchQuery || "").toLowerCase();
            var matchSearch = !q ||
                p.name.toLowerCase().indexOf(q) > -1 ||
                p.brand.toLowerCase().indexOf(q) > -1 ||
                p.category.toLowerCase().indexOf(q) > -1 ||
                p.sku.toLowerCase().indexOf(q) > -1 ||
                (p.shortDesc && p.shortDesc.toLowerCase().indexOf(q) > -1);
            return matchCat && matchSearch;
        }).sort(function (a, b) {
            if ($scope.sortOption === "price_asc") return a.price - b.price;
            if ($scope.sortOption === "price_desc") return b.price - a.price;
            return a.name.localeCompare(b.name);
        });
    };

    $scope.inStockCount = function () { return $scope.parts.filter(function (p) { return p.stock > 5; }).length; };
    $scope.lowStockCount = function () { return $scope.parts.filter(function (p) { return p.stock > 0 && p.stock <= 5; }).length; };
    $scope.outOfStockCount = function () { return $scope.parts.filter(function (p) { return p.stock === 0; }).length; };
    $scope.totalUnits = function () { return $scope.parts.reduce(function (sum, p) { return sum + p.stock; }, 0); };
    $scope.countByCategory = function (cat) { return $scope.parts.filter(function (p) { return p.category === cat; }).length; };
    $scope.countByShop = function (shop) { return $scope.parts.filter(function (p) { return p.shop === shop; }).length; };

    //  View detail modal
    $scope.viewDetails = function (part) {
        $scope.selectedPart = part;
        setTimeout(function () {
            var el = document.getElementById("detailModal");
            var instance = M.Modal.getInstance(el) || M.Modal.init(el, { dismissible: true });
            instance.open();
        }, 30);
    };

    //  inquire
    $scope.inquirePart = function (part) {
        if (!part) return;
        var loggedIn = JSON.parse(sessionStorage.getItem("LoggedInUser"));
        if (!loggedIn || loggedIn.Username === "guest") {
            Swal.fire({
                icon: 'info', title: 'Login Required',
                text: 'Please login to send an inquiry.',
                confirmButtonColor: '#bf360c', confirmButtonText: 'Go to Login'
            }).then(function (r) {
                if (r.isConfirmed) window.location.href = "/Moto/RegAndLog?mode=login";
            });
            return;
        }
        var detailModalEl = document.getElementById("detailModal");
        var instance = M.Modal.getInstance(detailModalEl);
        if (instance) instance.close();

        setTimeout(function () {
            Swal.fire({
                title: 'Inquire: ' + part.name,
                input: 'textarea',
                inputPlaceholder: 'Type your message here...',
                confirmButtonColor: '#bf360c', confirmButtonText: 'Send Inquiry',
                showCancelButton: true, cancelButtonColor: '#757575'
            }).then(function (result) {
                if (result.isConfirmed) {
                    $http.post('/Admin/SaveInquiry', {
                        UserId: loggedIn.UserId,
                        PartId: part.PartId,
                        Message: result.value
                    }).then(function (res) {
                        if (res.data.success) {
                            Swal.fire({ icon: 'success', title: 'Inquiry Sent!', text: 'Your inquiry has been saved. Shop: ' + part.shop, confirmButtonColor: '#bf360c' });
                        } else {
                            Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
                        }
                    });
                }
            });
        }, 200);
    };

    //  ADMIN TABS & FORM STATE
    $scope.activeTab = "dashboard";
    $scope.adminSearch = "";
    $scope.adminCatFilter = "All";
    $scope.categorySearch = "";
    $scope.shopSearch = "";
    $scope.stockLogSearch = "";
    $scope.userSearch = "";
    $scope.inquirySearch = "";
    $scope.partForm = {};
    $scope.catForm = {};
    $scope.shopForm = {};
    $scope.editMode = false;
    $scope.editingItem = null;
    $scope.formMode = "";

    $scope.adminFilteredParts = function () {
        return $scope.parts.filter(function (p) {
            var matchCat = $scope.adminCatFilter === "All" || p.category === $scope.adminCatFilter;
            var q = ($scope.adminSearch || "").toLowerCase();
            var matchSearch = !q || p.name.toLowerCase().indexOf(q) > -1 || p.sku.toLowerCase().indexOf(q) > -1 || p.brand.toLowerCase().indexOf(q) > -1;
            return matchCat && matchSearch;
        });
    };

    $scope.adminFilteredParts = function () {
        return $scope.parts.filter(function (p) {
            var matchCat = $scope.adminCatFilter === "All" || p.category === $scope.adminCatFilter;
            var q = ($scope.adminSearch || "").toLowerCase();
            var matchSearch = !q || p.name.toLowerCase().indexOf(q) > -1 || p.sku.toLowerCase().indexOf(q) > -1 || p.brand.toLowerCase().indexOf(q) > -1;
            return matchCat && matchSearch;
        });
    };

    // ── New filter functions for other tabs ─────────────────────────
    $scope.filteredCategories = function () {
        var q = ($scope.categorySearch || "").toLowerCase();
        if (!q) return $scope.dbCategories;
        return $scope.dbCategories.filter(function (c) {
            return (c.CategoryName && c.CategoryName.toLowerCase().indexOf(q) > -1) ||
                (c.Description && c.Description.toLowerCase().indexOf(q) > -1);
        });
    };

    $scope.filteredShops = function () {
        var q = ($scope.shopSearch || "").toLowerCase();
        if (!q) return $scope.shops;
        return $scope.shops.filter(function (s) {
            return (s.ShopName && s.ShopName.toLowerCase().indexOf(q) > -1) ||
                (s.Location && s.Location.toLowerCase().indexOf(q) > -1) ||
                (s.ContactNo && s.ContactNo.toLowerCase().indexOf(q) > -1);
        });
    };

    $scope.filteredStockLogs = function () {
        var q = ($scope.stockLogSearch || "").toLowerCase();
        if (!q) return $scope.stockLogs;
        return $scope.stockLogs.filter(function (log) {
            return (log.PartName && log.PartName.toLowerCase().indexOf(q) > -1) ||
                (log.SKU && log.SKU.toLowerCase().indexOf(q) > -1) ||
                (log.CategoryName && log.CategoryName.toLowerCase().indexOf(q) > -1) ||
                (log.ShopName && log.ShopName.toLowerCase().indexOf(q) > -1) ||
                (log.Reason && log.Reason.toLowerCase().indexOf(q) > -1);
        });
    };

    $scope.filteredUsers = function () {
        var q = ($scope.userSearch || "").toLowerCase();
        if (!q) return $scope.userArray;
        return $scope.userArray.filter(function (u) {
            return (u.Name && u.Name.toLowerCase().indexOf(q) > -1) ||
                (u.Username && u.Username.toLowerCase().indexOf(q) > -1) ||
                (u.Phone && u.Phone.toLowerCase().indexOf(q) > -1);
        });
    };

    $scope.filteredInquiries = function () {
        var q = ($scope.inquirySearch || "").toLowerCase();
        if (!q) return $scope.inquiries;
        return $scope.inquiries.filter(function (inq) {
            return (inq.Message && inq.Message.toLowerCase().indexOf(q) > -1) ||
                (inq.Status && inq.Status.toLowerCase().indexOf(q) > -1);
        });
    };

    // Helper: format /Date(...)/ or ISO date to readable string
    $scope.formatLogDate = function (dateValue) {
        if (!dateValue) return "—";
        var date;
        if (typeof dateValue === "string" && dateValue.indexOf("/Date(") === 0) {
            var timestamp = parseInt(dateValue.replace("/Date(", "").replace(")/", ""), 10);
            date = new Date(timestamp);
        } else {
            date = new Date(dateValue);
        }
        if (isNaN(date.getTime())) return "—";
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit"
        });
    };

    // Helper: stable page reload after successful CRUD
    function reloadPageAfterSuccess() {
        setTimeout(function () {
            window.location.reload();
        }, 900);
    }

    function openModal(id) {
        setTimeout(function () {
            var el = document.getElementById(id);
            var instance = M.Modal.getInstance(el) || M.Modal.init(el);
            instance.open();
        }, 0);
    }
    function closeModal(id) {
        var el = document.getElementById(id);
        var instance = M.Modal.getInstance(el);
        if (instance) instance.close();
    }

    //  DASHBOARD CHARTS — define FIRST so refreshDashboardCharts() works
    $scope.chartInstances = { cat: null, shop: null, stock: null, stockTrend: null };

    $scope.loadDashboardCharts = function () {
        MotoPartsHubSystemService.getPartsPerCategory().then(function (res) {
            if (!res.data.success) return;
            var labels = res.data.data.map(function (x) { return x.Label; });
            var counts = res.data.data.map(function (x) { return x.Count; });
            var ctx = document.getElementById('chartCategory');
            if (!ctx) return;
            if ($scope.chartInstances.cat) $scope.chartInstances.cat.destroy();
            $scope.chartInstances.cat = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{ label: 'Parts', data: counts, backgroundColor: '#bf360c', borderRadius: 4 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
                }
            });
        });

        MotoPartsHubSystemService.getPartsPerShop().then(function (res) {
            if (!res.data.success) return;
            var labels = res.data.data.map(function (x) { return x.Label; });
            var counts = res.data.data.map(function (x) { return x.Count; });
            var ctx = document.getElementById('chartShop');
            if (!ctx) return;
            if ($scope.chartInstances.shop) $scope.chartInstances.shop.destroy();
            $scope.chartInstances.shop = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{ data: counts, backgroundColor: ['#bf360c', '#1565c0', '#388e3c', '#e65100', '#6a1b9a', '#212121', '#00838f'] }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
                }
            });
        });

        MotoPartsHubSystemService.getStockStatusSummary().then(function (res) {
            if (!res.data.success) return;
            var labels = res.data.data.map(function (x) { return x.Label; });
            var counts = res.data.data.map(function (x) { return x.Count; });
            var ctx = document.getElementById('chartStock');
            if (!ctx) return;
            if ($scope.chartInstances.stock) $scope.chartInstances.stock.destroy();
            $scope.chartInstances.stock = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{ data: counts, backgroundColor: ['#c62828', '#e65100', '#388e3c'] }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
                }
            });
        });

        // Chart 4: Stock Changes Over Time (Line)
        MotoPartsHubSystemService.getStockChangesOverTime().then(function (res) {
            if (!res.data.success) {
                console.log("Stock trend chart error:", res.data.message);
                return;
            }
            var labels = res.data.data.map(function (x) { return x.Label; });
            var counts = res.data.data.map(function (x) { return x.Count; });
            console.log("Stock trend data:", labels, counts);
            var ctx = document.getElementById('chartStockTrend');
            if (!ctx) return;
            if ($scope.chartInstances.stockTrend) $scope.chartInstances.stockTrend.destroy();
            $scope.chartInstances.stockTrend = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Stock Changes',
                        data: counts,
                        borderColor: '#bf360c',
                        backgroundColor: 'rgba(191, 54, 12, 0.15)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#bf360c',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 1 } },
                        x: { ticks: { font: { size: 10 } } }
                    }
                }
            });
        });
    };

    // Helper: refresh dashboard charts (works regardless of active tab)
    function refreshDashboardCharts() {
        setTimeout(function () {
            if (typeof $scope.loadDashboardCharts === "function") {
                $scope.loadDashboardCharts();
            }
        }, 500);
    }

    function refreshAllDashboardData() {
        reloadCategories()
            .then(reloadShops)
            .then(reloadParts)
            .then(reloadStockLogs)
            .then(function () {
                refreshDashboardCharts();
            });
    }

    function refreshAllDashboardData() {
        reloadCategories()
            .then(reloadShops)
            .then(reloadParts)
            .then(reloadStockLogs)
            .then(reloadReportSummary)
            .then(function () {
                refreshDashboardCharts();
            });
    }

    //  PARTS CRUD
    $scope.openAddModal = function () {
        $scope.editMode = false;
        $scope.editingItem = null;
        $scope.partForm = { CategoryId: 1, ShopId: 1, Stock: 0, Price: 0 };
        openModal('partModal');
    };

    $scope.openEditModal = function (part) {
        $scope.editMode = true;
        $scope.editingItem = part;
        $scope.partForm = {
            PartId: part.PartId, PartName: part.name, SKU: part.sku,
            Brand: part.brand, CategoryId: part.CategoryId, ShopId: part.ShopId,
            Price: part.price, Stock: part.stock, ShortDesc: part.shortDesc
        };
        openModal('partModal');
    };

    $scope.savePart = function () {
        if (!$scope.partForm.PartName || !$scope.partForm.SKU || !$scope.partForm.Price) {
            Swal.fire({ icon: 'warning', title: 'Incomplete', text: 'Please fill in Name, SKU and Price.', confirmButtonColor: '#bf360c' });
            return;
        }
        var url = $scope.editMode ? '/Admin/EditPart' : '/Admin/AddPart';
        $http.post(url, $scope.partForm).then(function (res) {
            if (res.data.success) {
                closeModal('partModal');
                $scope.editMode = false;
                $scope.partForm = {};
                Swal.fire({ icon: 'success', title: res.data.message, confirmButtonColor: '#bf360c', timer: 800, showConfirmButton: false });
                reloadPageAfterSuccess();
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
            }
        });
    };

    $scope.deletePart = function (part) {
        Swal.fire({
            icon: 'warning', title: 'Delete Part',
            text: 'Delete "' + part.name + '"? It will be marked inactive in the database.',
            confirmButtonColor: '#c62828', showCancelButton: true,
            cancelButtonColor: '#757575', confirmButtonText: 'Yes, delete'
        }).then(function (result) {
            if (result.isConfirmed) {
                $http.post('/Admin/DeletePart', { partId: part.PartId }).then(function (res) {
                    if (res.data.success) {
                        Swal.fire({ icon: 'success', title: 'Deleted!', confirmButtonColor: '#bf360c', timer: 800, showConfirmButton: false });
                        reloadPageAfterSuccess();
                    } else {
                        Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
                    }
                });
            }
        });
    };

    //  CATEGORIES CRUD
    $scope.openAddCategoryModal = function () {
        $scope.editMode = false;
        $scope.editingItem = null;
        $scope.catForm = {};
        openModal('categoryModal');
    };

    $scope.openEditCategoryModal = function (cat) {
        $scope.editMode = true;
        $scope.editingItem = cat;
        $scope.catForm = { CategoryId: cat.CategoryId, CategoryName: cat.CategoryName, Description: cat.Description };
        openModal('categoryModal');
    };

    $scope.saveCategory = function () {
        if (!$scope.catForm.CategoryName) {
            Swal.fire({ icon: 'warning', title: 'Incomplete', text: 'Category name is required.', confirmButtonColor: '#bf360c' });
            return;
        }
        var url = $scope.editMode ? '/Admin/EditCategory' : '/Admin/AddCategory';
        $http.post(url, $scope.catForm).then(function (res) {
            if (res.data.success) {
                closeModal('categoryModal');
                $scope.editMode = false;
                $scope.catForm = {};
                Swal.fire({ icon: 'success', title: res.data.message, confirmButtonColor: '#bf360c', timer: 800, showConfirmButton: false });
                reloadPageAfterSuccess();
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
            }
        });
    };

    $scope.deleteCategory = function (cat) {
        Swal.fire({
            icon: 'warning', title: 'Delete Category',
            text: 'Delete "' + cat.CategoryName + '"?',
            confirmButtonColor: '#c62828', showCancelButton: true,
            cancelButtonColor: '#757575', confirmButtonText: 'Yes, delete'
        }).then(function (result) {
            if (result.isConfirmed) {
                $http.post('/Admin/DeleteCategory', { categoryId: cat.CategoryId }).then(function (res) {
                    if (res.data.success) {
                        Swal.fire({ icon: 'success', title: 'Deleted!', confirmButtonColor: '#bf360c', timer: 800, showConfirmButton: false });
                        reloadPageAfterSuccess();
                    } else {
                        Swal.fire({ icon: 'error', title: 'Cannot Delete', text: res.data.message, confirmButtonColor: '#bf360c' });
                    }
                });
            }
        });
    };

    //  SHOPS CRUD
    $scope.openAddShopModal = function () {
        $scope.editMode = false;
        $scope.editingItem = null;
        $scope.shopForm = {};
        openModal('shopModal');
    };

    $scope.openEditShopModal = function (shop) {
        $scope.editMode = true;
        $scope.editingItem = shop;
        $scope.shopForm = { ShopId: shop.ShopId, ShopName: shop.ShopName, Location: shop.Location, ContactNo: shop.ContactNo };
        openModal('shopModal');
    };

    $scope.saveShop = function () {
        if (!$scope.shopForm.ShopName) {
            Swal.fire({ icon: 'warning', title: 'Incomplete', text: 'Shop name is required.', confirmButtonColor: '#bf360c' });
            return;
        }
        var url = $scope.editMode ? '/Admin/EditShop' : '/Admin/AddShop';
        $http.post(url, $scope.shopForm).then(function (res) {
            if (res.data.success) {
                closeModal('shopModal');
                $scope.editMode = false;
                $scope.shopForm = {};
                Swal.fire({ icon: 'success', title: res.data.message, confirmButtonColor: '#bf360c', timer: 800, showConfirmButton: false });
                reloadPageAfterSuccess();
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
            }
        });
    };

    $scope.deleteShop = function (shop) {
        Swal.fire({
            icon: 'warning', title: 'Deactivate Shop',
            text: 'Deactivate "' + shop.ShopName + '"?',
            confirmButtonColor: '#c62828', showCancelButton: true,
            cancelButtonColor: '#757575', confirmButtonText: 'Yes, deactivate'
        }).then(function (result) {
            if (result.isConfirmed) {
                $http.post('/Admin/DeleteShop', { shopId: shop.ShopId }).then(function (res) {
                    if (res.data.success) {
                        Swal.fire({ icon: 'success', title: res.data.message, confirmButtonColor: '#bf360c', timer: 800, showConfirmButton: false });
                        reloadPageAfterSuccess();
                    } else {
                        Swal.fire({ icon: 'error', title: 'Cannot Deactivate', text: res.data.message, confirmButtonColor: '#bf360c' });
                    }
                });
            }
        });
    };

    //  USERS
    $scope.toggleUser = function (user) {
        var action = user.IsActive === 1 ? "Deactivate" : "Activate";
        Swal.fire({
            icon: 'question', title: action + ' User',
            text: action + ' user "' + user.Username + '"?',
            confirmButtonColor: '#bf360c', showCancelButton: true,
            cancelButtonColor: '#757575', confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.isConfirmed) {
                $http.post('/Admin/DeactivateUser', { userId: user.UserId }).then(function (res) {
                    if (res.data.success) {
                        Swal.fire({ icon: 'success', title: res.data.message, confirmButtonColor: '#bf360c', timer: 1200, showConfirmButton: false });
                        reloadUsers();
                    } else {
                        Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
                    }
                });
            }
        });
    };

    //  INQUIRIES
    $scope.updateInquiryStatus = function (inquiry, status) {
        if (status === "Responded") {
            Swal.fire({
                title: 'Reply to Inquiry',
                input: 'textarea',
                inputPlaceholder: 'Type your response here...',
                inputValue: inquiry.AdminResponse || '',
                showCancelButton: true,
                confirmButtonText: 'Send Response',
                confirmButtonColor: '#bf360c',
                cancelButtonColor: '#757575'
            }).then(function (result) {
                if (result.isConfirmed) {
                    $http.post('/Admin/UpdateInquiryStatus', {
                        inquiryId: inquiry.InquiryId,
                        status: status,
                        adminResponse: result.value
                    }).then(function (res) {
                        if (res.data.success) {
                            Swal.fire({ icon: 'success', title: 'Response Sent!', confirmButtonColor: '#bf360c', timer: 1200, showConfirmButton: false });
                            reloadInquiries();
                        } else {
                            Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
                        }
                    });
                }
            });
        } else {
            $http.post('/Admin/UpdateInquiryStatus', {
                inquiryId: inquiry.InquiryId,
                status: status
            }).then(function (res) {
                if (res.data.success) {
                    Swal.fire({ icon: 'success', title: res.data.message, confirmButtonColor: '#bf360c', timer: 1200, showConfirmButton: false });
                    reloadInquiries();
                } else {
                    Swal.fire({ icon: 'error', title: 'Error', text: res.data.message, confirmButtonColor: '#bf360c' });
                }
            });
        }
    };

    //  REPORTS — initial load
    $scope.reportData = {};
    reloadReportSummary();

    $scope.downloadReport = function () {
        var rd = $scope.reportData || {};
        var now = new Date();


        // Date for header (readable)
        var headerDate = now.toLocaleString("en-US", {
            year: "numeric", month: "long", day: "2-digit",
            hour: "numeric", minute: "2-digit"
        });

        // Date for filename (YYYYMMDD_HHMMSS)
        var pad = function (n) { return String(n).padStart(2, '0'); };
        var fileDate = now.getFullYear() +
            pad(now.getMonth() + 1) +
            pad(now.getDate()) + "_" +
            pad(now.getHours()) +
            pad(now.getMinutes()) +
            pad(now.getSeconds());

        var fileName = "MotoPartsHub_Report_" + fileDate + ".pdf";

        // Initialize jsPDF
        var doc = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        var pageWidth = doc.internal.pageSize.getWidth();
        var leftMargin = 14;
        var y = 18;

        // ── TITLE ──
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(191, 54, 12); // #bf360c brand color
        doc.text("MotoPartsHub Reports Summary", pageWidth / 2, y, { align: 'center' });

        y += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(120, 120, 120);
        doc.text("Generated: " + headerDate, pageWidth / 2, y, { align: 'center' });

        // Decorative line
        y += 4;
        doc.setDrawColor(191, 54, 12);
        doc.setLineWidth(0.5);
        doc.line(leftMargin, y, pageWidth - leftMargin, y);

        y += 8;

        // ── SECTION 1: INVENTORY SUMMARY ──
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(33, 33, 33);
        doc.text("1. Inventory Summary", leftMargin, y);
        y += 2;

        doc.autoTable({
            startY: y + 2,
            head: [['Metric', 'Value']],
            body: [
                ['Total Parts', String(rd.totalParts || 0)],
                ['In Stock', String(rd.inStock || 0)],
                ['Low Stock', String(rd.lowStock || 0)],
                ['Out of Stock', String(rd.outOfStock || 0)],
                ['Registered Users', String(rd.totalUsers || 0)],
                ['Total Inquiries', String(rd.totalInquiries || 0)]
            ],
            theme: 'grid',
            headStyles: {
                fillColor: [33, 33, 33],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: { fontSize: 10, textColor: [50, 50, 50] },
            alternateRowStyles: { fillColor: [248, 248, 248] },
            margin: { left: leftMargin, right: leftMargin },
            columnStyles: {
                0: { cellWidth: 100 },
                1: { halign: 'right', cellWidth: 40 }
            }
        });

        y = doc.lastAutoTable.finalY + 10;

        // ── SECTION 2: PARTS BY CATEGORY ──
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(33, 33, 33);
        doc.text("2. Parts by Category", leftMargin, y);

        var categoryRows = (rd.byCategory && rd.byCategory.length)
            ? rd.byCategory.map(function (item) {
                return [item.CategoryName || '—', String(item.Count || 0)];
            })
            : [['No data', '0']];

        doc.autoTable({
            startY: y + 2,
            head: [['Category', 'Number of Parts']],
            body: categoryRows,
            theme: 'grid',
            headStyles: {
                fillColor: [191, 54, 12],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: { fontSize: 10, textColor: [50, 50, 50] },
            alternateRowStyles: { fillColor: [253, 247, 245] },
            margin: { left: leftMargin, right: leftMargin },
            columnStyles: {
                0: { cellWidth: 100 },
                1: { halign: 'right', cellWidth: 40 }
            }
        });

        y = doc.lastAutoTable.finalY + 10;

        // ── SECTION 3: PARTS BY SHOP ──
        // Check if need new page
        if (y > 240) {
            doc.addPage();
            y = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(33, 33, 33);
        doc.text("3. Parts by Shop", leftMargin, y);

        var shopRows = (rd.byShop && rd.byShop.length)
            ? rd.byShop.map(function (item) {
                return [item.ShopName || '—', String(item.Count || 0)];
            })
            : [['No data', '0']];

        doc.autoTable({
            startY: y + 2,
            head: [['Shop', 'Number of Parts']],
            body: shopRows,
            theme: 'grid',
            headStyles: {
                fillColor: [21, 101, 192],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: { fontSize: 10, textColor: [50, 50, 50] },
            alternateRowStyles: { fillColor: [245, 250, 255] },
            margin: { left: leftMargin, right: leftMargin },
            columnStyles: {
                0: { cellWidth: 100 },
                1: { halign: 'right', cellWidth: 40 }
            }
        });

        // ── FOOTER on every page ──
        var pageCount = doc.internal.getNumberOfPages();
        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            var pageHeight = doc.internal.pageSize.getHeight();
            doc.text(
                "MotoPartsHub - Motorcycle Parts Inventory & Catalog System",
                pageWidth / 2, pageHeight - 10, { align: 'center' }
            );
            doc.text(
                "Page " + i + " of " + pageCount,
                pageWidth - leftMargin, pageHeight - 10, { align: 'right' }
            );
        }

        // Save the PDF
        doc.save(fileName);

        // Success popup
        Swal.fire({
            icon: 'success',
            title: 'Report Downloaded',
            text: 'The PDF report has been generated successfully.',
            confirmButtonColor: '#bf360c',
            timer: 2000,
            showConfirmButton: false
        });
    };

    // Auto-load charts when dashboard tab is active
    $scope.$watch('activeTab', function (newVal, oldVal) {
        if (newVal === 'dashboard') {
            setTimeout(function () { $scope.loadDashboardCharts(); }, 150);
        }
    });
});