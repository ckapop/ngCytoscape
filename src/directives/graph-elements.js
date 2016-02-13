(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphElements', graphElements);

    graphElements.$inject = ['cytoHelpers', 'cytoElementsHelpers'];
    function graphElements(cytoHelpers, cytoElementsHelpers){
        var directive = {
            restric: 'A',
            require: '^cytoscape',
            link:linkFn
        };
        return directive;

        function linkFn(scope,elements,attrs,controller){
            var _scope = controller._getCytoscapeScope();
            var isDefined = cytoHelpers.isDefined;
            var graph;
            controller._getCytoscapeGraph().then(function(cy){
                graph = cy;
            });
            scope.$watchCollection(function(){
                return _scope.graphElements;
            }, function(nv,ov){
                if(isDefined(nv) && nv !== ov){
                    cytoElementsHelpers.processChange(nv,graph,_scope);
                }
            });

            scope.$watch(watchNodeList, function (nv) {
                if(nv && nv.length > 0)
                if(graph)
                graph.style().update();
            },true);
            function watchNodeList() {
                return scope.elements.map(nodeMap);
            }
            function nodeMap (node) {
                return node.data;
            }



        }
    }
})();