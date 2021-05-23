d3.csv("US-states.csv").then(data=>{
    
    d3.json("US-geo.json").then(drawUSA);
        function drawUSA(USA) {
        
        console.log("EAST or WEST", data);
        
        var width = 1000;
        var heigh = 600;
/*
        for (var i=0 ; i < data.length ; i++){
            console.log("USA states",data.state);
            console.log("USA EASTorWEST",data.EASTorWEST);
            var datastate =data[i].state;
            var dataEASTorWEST = data[i].EASTorWEST;
            for(var j = 0 ; j < json.features.length ; j++){
                var josnstate = json.features[j].properties.name;
                if (datastate == josnstate){
                    josnstate.features[j].properties.EASTorWEST =dataEASTorWEST;
                    break;
                }
            }

        }*/
        console.log("USA states",USA.features);
       

        var projection = d3.geoMercator()
            .fitExtent([[0,0], [width, heigh]], USA);

        var geoGenerator = d3.geoPath()
            .projection(projection);
    
        var paths = d3.select('svg')
            .selectAll('path')
            .data(USA.features)
            .enter()
            .append('path')
            .attr('stroke', "white")
            .attr('fill', function(d){
                //console.log("USA name",d.properties.name);
                
                    return 'steelblue';
                
                
            })
            .attr('d', geoGenerator);

        paths.data(USA.features)
            .style('fill',function(d){
                
                    for (var i=0 ; i < data.length ; i++){
                        if (d.properties.name == data[i].state){
                            console.log("d name",d.properties.name);
                            console.log("data name",data[i].state);
                            console.log("data EAST",data[i].EASTorWEST);
                            if (data[i].EASTorWEST == 'East'){
                                return 'steelblue';
                            }
                            else{
                                return '#FFB6C1';
                            }

                    }
                    
                } 
            })
        
        //console.log("USA features",USA.features);
    
        var texts = d3.select('svg')
            .selectAll('text')
            .data(USA.features)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr('opacity', 0.5)
            .text(function(d) {
                return d.properties.name;
             })
            .attr('transform', function(d) {
            var center = geoGenerator.centroid(d);
                return 'translate (' + center + ')';
        });
}

});


