/**
 * Created by akash on 8/14/16.
 */
"use strict"
var app = angular.module('spa',['chart.js','ui.router','ui.bootstrap','ngCookies', 'ngStorage']);
app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            views: {
                'main@':{
                    templateUrl: 'login.ejs',
                    controller:'logincontroller'
                }
            }

        })
        .state('logout', {
            url: '/logout',
            views: {
                'main@':{
                    templateUrl: 'login.ejs',
                    controller:'logincontroller'
                }
            }

        })
        .state('admin', {
            url: "/admin",
            views:{
                'main@':{
                    templateUrl: 'adminlogin.ejs',
                    controller:'admincontroller'
                }
            }
        })
        .state('signup', {
            url: "/signup",
            views:{
                'main@':{
                    templateUrl: 'signup.ejs',
                    controller:'signupcontroller'
                }
            }
        })
        .state('profile', {
            url: "/profile",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'profile.ejs',
                    controller : 'profilecontroller'
                }
            },
            params: { test: "default value" }
        })
        .state('adminprofile', {
            url: "/adminprofile",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'admindashboard.ejs',
                    controller : 'adminprofilecontroller'
                }
            },
            params: { test: "default value" }
        })
        .state('createSensorHub', {
            url: "/createsensorhub",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'createSensorHubForm.ejs',
                    controller : 'createsensorhubcontroller'
                }
            },
            params: { test: "default value" }
        })
        .state('createSensor', {
            url: "/createsensor",
            views:{
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'createSensorForm.ejs',
                    controller : 'createsensorcontroller'
                }
            },
            params: { test: "default value" }
        })
        .state('sensorManagement', {
            url: "/sensorManagement",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'management.ejs',
                    controller : 'managementController'
                }
            },
            params: { test: "default value" }
        })
        .state('monitor', {
            url: "/monitor",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'monitor.ejs',
                    controller : 'monitorController'
                }
            },
            params: { test: "default value" }
        })
        .state('autoscaling', {
            url: "/autoscaling",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'autoscaling.ejs',
                    controller : 'managementController'
                }
            },
            params: { test: "default value" }
        })
        .state('viewSensorsInfo', {
            url: "/sensorsInfo",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'sensorInfo.ejs',
                    controller : 'viewSensorInfoController'
                }
            },
            params: { test: "default value" }
        })
        .state('deleteSensor', {
            url: "/deleteSensor",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'deleteSensor.ejs',
                    controller : 'deleteSensorController'
                }
            },
            params: { test: "default value" }
        })
        .state('manageUser', {
            url: "/manageUser",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'manageUser.ejs',
                    controller : 'manageUserController'
                }
            },
            params: { test: "default value" }
        })
        .state('editSensor', {
            url: "/editSensor",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'editSensor.ejs',
                    controller : 'editSensorController'
                }
            },
            params: { test: "default value" }
        })
        .state('addSensor', {
            url: "/addSensor",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'AddSensor.ejs',
                    controller : 'addSensorController'
                }
            },
            params: { test: "default value" }
        })
        .state('viewSensorData', {
            url: "/sensorData",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'viewSensorData.ejs',
                    controller : 'managementController'
                }
            },
            params: { test: "default value" }
        })
        .state('billing', {
            url: "/billing",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'billing.ejs',
                    controller : 'billingController'
                }
            },
            params: { test: "default value" }
        })
        .state('monitorSensorAdmin', {
            url: "/monitorSensorAdmin",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'monitorSensorAdmin.ejs',
                    controller : 'monitorSensorAdminController'
                }
            },
            params: { test: "default value" }
        })
        .state('deleteSensorHub', {
            url: "/deleteSensorHub",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'deleteSensorHubForm.ejs',
                    controller : 'deleteSensorHubController'
                }
            },
            params: { test: "default value" }
        })
        .state('monitorCluster', {
            url: "/monitorCluster",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'sidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'monitorCluster.ejs',
                    controller : 'monitorController'
                }
            },
            params: { test: "default value" }
        })
        .state('monitorAdminCluster', {
            url: "/monitorClusterAdmin",
            views:{
                'navbar@':{
                    templateUrl: 'navbar.ejs',
                    controller: 'navBarController'
                },
                'sidemenu@':{
                    templateUrl: 'adminsidebarView.ejs',
                    controller: 'navBarController'
                },
                'main@':{
                    templateUrl: 'monitorClusterAdmin.ejs',
                    controller : 'monitorSensorAdminController'
                }
            },
            params: { test: "default value" }
        });
});
