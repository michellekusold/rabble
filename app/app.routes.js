function configureRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");

    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "components/home/home.html",
            controller: "homeController as vm"
        })
        .state("monitor", {
            cache: false,
            url: "/monitor",
            templateUrl: "components/monitor/monitor.html",
            controller: "monitorController as vm"
        })
        .state("play", {
            abstract: true,
            url: "/play",
            templateUrl: "components/play/play.html",
            controller: "playController as vm"
        })
          .state("play.code", {
              parent: "play",
              url: "/code",
              templateUrl: "components/play/code.html",
          })
          .state("play.name", {
              parent: "play",
              url: "/name",
              templateUrl: "components/play/name.html",
              controller: "playController as vm"
          })
          .state("play.waiting", {
              parent: "play",
              url: "/waiting",
              templateUrl: "components/play/waiting.html",
              controller: "playController as vm"
          });
}
