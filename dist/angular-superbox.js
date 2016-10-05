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

angular.module('superbox').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/superbox/superbox.html',
    "<div class=\"as-superbox\" ng-model-options=\"{ getterSetter: true }\">\n" +
    "    <superbox-list entry=\"entry\"  template=\"superboxShowTemplate\" actions=\"superboxActions\" current-entry=\"currentEntry\" ng-repeat=\"entry in superboxModel | orderBy: 'sort'\"></superbox-list>\n" +
    "    <div class=\"as-superbox-float\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/superbox/superbox-list.html',
    "<div class=\"as-superbox-list\" ng-class=\"{'as-superbox-list-selected' : isSelected(entry)}\" ng-click=\"currentEntry(entry)\" id=\"superbox-item-{{entry.id}}\">\n" +
    "    <img ng-src=\"{{entry.img_thumb}}\"\n" +
    "         data-img=\"{{entry.img_full}}\"\n" +
    "         alt=\"{{entry.alt}}\" title=\"{{entry.title}}\" class=\"as-superbox-img\">\n" +
    "         <superbox-status superbox-template=\"entry.statusTemplate\" superbox-text=\"entry.status\" class=\"mc-superbox-img-description mc-status-bg\"></superbox-status>\n" +
    "</div>\n" +
    "<div id=\"superbox-show-{{entry.id }}\" class=\"as-superbox-show\" style=\"display: block\" ng-show=\"isSelected(entry)\">\n" +
    "    <div class=\"as-superbox-show-template\">\n" +
    "    <div id=\"superbox-imgInfoBox-{{entry.id}}\" class=\"as-superbox-imageinfo\">\n" +
    "        <h1>{{entry.title}}</h1>\n" +
    "        <span>\n" +
    "            <p class=\"as-superbox-img-description\">{{entry.description}}</p>\n" +
    "            <br/>\n" +
    "            <br/>\n" +
    "\n" +
    "           <button type=\"button\" class=\"btn btn-primary btn-sm\" style=\"padding: 5px; margin: 5px;\" ng-repeat=\"actionObj in actions\" ng-click=\"actionObj.action(entry)\">\n" +
    "               {{actionObj.label}}\n" +
    "           </button>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <img ng-src=\"{{entry.img_full_real}}\" class=\"as-superbox-current-img\">\n" +
    "    </div>\n" +
    "    <span class=\"glyphicon glyphicon-remove as-superbox-close\" aria-hidden=\"true\" ng-click=\"close()\"></span>\n" +
    "</div>\n"
  );

}]);
