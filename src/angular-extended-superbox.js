/*global Image */

(function () {
    'use strict';

    var module = angular.module('superbox', []).run(['$anchorScroll', function ($anchorScroll) {
        $anchorScroll.yOffset = 30; // always scroll some extra pixels
    }]);

    module.directive('superbox', ['$location', '$anchorScroll', function ($location, $anchorScroll) {

        return {
            templateUrl: 'templates/superbox/superbox.html',
            restrict: 'E',
            scope: {
                superboxModel: '=',
                superboxActions: '=',
                superboxOptions: '=?',
            },
            link: function (scope) {

                scope.scroll = true;
                // Mapping model fields if necessary...
                if (scope.superboxOptions && scope.superboxOptions.fieldMapping) {
                    Object.getOwnPropertyNames(scope.superboxOptions.fieldMapping).forEach(function (val) {
                        angular.forEach(scope.superboxModel, function (entry) {
                            entry[val] = entry[scope.superboxOptions.fieldMapping[val]];
                        });
                    });
                }

                if (scope.superboxOptions && scope.superboxOptions.scrollEnabled === false) {
                    scope.scroll = scope.superboxOptions.scrollEnabled;
                }

                if (scope.superboxOptions && scope.superboxOptions.scrollyOffset) {
                    $anchorScroll.yOffset = scope.superboxOptions.scrollyOffset;
                }

                if (scope.superboxOptions && scope.superboxOptions.superboxShowTemplate) {
                    scope.superboxShowTemplate = scope.superboxOptions.superboxShowTemplate;
                }

                for (var i = 0; i < scope.superboxModel.length; i++) {
                    if (!scope.superboxModel[i].id) {
                        scope.superboxModel[i].id = i;
                    }
                }

                var indexByObj = function (array, obj) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id === obj.id) {
                            return i;
                        }
                    }
                };

                scope._currentEntry = null;

                scope.currentEntry = function (entry) {
                    if (arguments.length === 1) {

                        if (entry !== "undefined") {
                            var idxSuperBoxModel = indexByObj(scope.superboxModel, entry);

                            if (scope.superboxModel[idxSuperBoxModel].img_full_real === undefined) {
                                var img = new Image();
                                img.src = entry.img_full;
                                img.onload = function () {
                                    $anchorScroll();
                                };
                                scope.superboxModel[idxSuperBoxModel].img_full_real = entry.img_full;
                            }
                        }
                        scope._currentEntry = entry;

                        if (scope.scroll) {
                            $location.hash('superbox-item-' + entry.id);
                            $anchorScroll();
                        }
                    }
                    return scope._currentEntry;
                };

            }
        };

    }]);

    module.directive('superboxList', ['$compile', '$templateCache', '$http',
        function ($compile, $templateCache, $http) {

            return {
                templateUrl: 'templates/superbox/superbox-list.html',
                restrict: 'E',
                scope: {
                    entry: '=',
                    actions: '=',
                    currentEntry: '=',
                    template: '='
                },
                link: function (scope, element) {

                    scope.isSelected = function () {
                        return scope.currentEntry() === scope.entry;
                    };

                    scope.close = function () {
                        scope.currentEntry("undefined");
                    };

                    if (scope.template && scope.template !== "") {
                        var templateLoader = $http.get(scope.template, {
                            cache: $templateCache
                        });
                        templateLoader.success(function (html) {
                            element.html(html);
                        }).then(function () {
                            element.html($compile(element.html())(scope));
                        });
                    }
                }
            };
        }
    ]);

    module.directive("superboxStatus", ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                superboxTemplate: '=',
                superboxText: '=',
            },
            link: function (scope, element) {
                element.html(scope.superboxText);
                if (scope.superboxTemplate !== undefined) {
                    $compile(scope.superboxTemplate)(scope, function (cloned) {
                        element.html(cloned);
                    });
                }
            }
        };
    }]);

}());
