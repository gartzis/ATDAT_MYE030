
const socket=io('http://localhost:3000')
const content=document.querySelector("#message-container")
const button=document.querySelector("#button-id")
const yearborder1=document.querySelector("#price-min")
const yearborder2=document.querySelector("#price-max")
var years,indicators,countries
var min_year,min_yr,max_year,max_yr,group_yr,group_by,isgraph,choice_of_graph,combinations=0, interval_prev,inter=0;;
var selected_indicators=[],selected_countries=[], country_list=[],indicator_list=[],list_combs=[],q_countries=[],q_indicators=[],combos=[];

socket.on('connected',data =>{
  
  socket.emit('countries',"8elw kati!!!")
  socket.emit('years',"8elw kati!!!")
  socket.emit('indicators',"8elw kati!!!")
  
 
  let cont = document.createElement('div')
  cont.innerText=data
  content.append(cont)
  
})

socket.on('yearminmax',year =>{
  
  min_year=year[0]['min(year)']
  max_year=year[0]['max(year)']
  yearborder1.setAttribute("min", `${min_year}`);
  yearborder1.setAttribute("max", `${max_year}`);
  yearborder2.setAttribute("min", `${min_year}`);
  yearborder2.setAttribute("max", `${max_year}`);

  
  

})


socket.on('years',year =>{
  years=JSON.parse(year);
  
  



})
socket.on('countries',country =>{
  country_list=[]
  countries=JSON.parse(country);
  country_menu=document.querySelector("#checkboxes")
  
  for(let  i=0 ;i<countries.length ;i++){
    
    country_list.push(countries[i]['country'])
     
     country_menu.innerHTML+=`<label for="${countries[i]['country']}">
     <input type="checkbox" onClick="countries_choice(${i})" id="${countries[i]['country']}" />${countries[i]['country']} </label>`
      

  }


})
socket.on('indicators',indicator =>{
  indicators=JSON.parse(indicator);

  indicator_list=[]
  indicator_menu=document.querySelector("#checkboxes_indicator")
  
 for(let i=0;i<indicators.length;i++){
    indicator_list.push(indicators[i]['indicator'])
     
    indicator_menu.innerHTML+=`<label for="${indicators[i]['indicator']}">
    <input type="checkbox" onClick="indicators_choice(${i})" id="${indicators[i]['indicator']}" />${indicators[i]['indicator']} </label>`
  

 }
})

var data=[];
socket.on('answer',dataa =>{
  const promise1 = new Promise((resolve, reject) => {
    
    for(let i=0;i<dataa.length;i++){
      //if(dataa['avg(measure)']){
      dataa = dataa.replace("\"avg(measure)\":", "\"measure\":");
      //}

      //dataa = dataa.replace("\"year\":", "\"letter\":");

      var data2 = JSON.parse(dataa);
    }
    var data2 = JSON.parse(dataa);
    var prev_year =min_yr
    var prev_country
    list_combs=[]
    console.log("data2[0] ",data2)
    //console.log("list_combs[0] ",list_combs[0])
    
    
    //list_combs
        console.log(data2)
        lista={'year':data2[0]['year']}
        for(let l=0;l<combinations;l++){
          lista['indicator'+l]="-"
          lista['country'+l]="-"
          lista['measure'+l]=0
        }
        pos=0
        var country_cur=data2[0]['country']
        var indicator_cur=data2[0]['indicator'];
        var year_cur=data2[0]['year']

        for(let i=0;i<data2.length;i++){
         //console.log("data2 year ",data2[i]["year"])  
          if(data2[i]["year"]>=min_yr && data2[i]["year"]<=max_yr){
            if(year_cur!=data2[i]['year']){
              pos=0
              year_cur=data2[i]['year']
              list_combs.push(lista)
              console.log(data2[i]['year'])
              lista={'year':data2[i]['year']}
              for(let l=0;l<combinations;l++){
                lista['indicator'+l]="-"
                lista['country'+l]="-"
                lista['measure'+l]=0
              }
            }
            /*if(country_cur!=data2[i]['country'] || indicator_cur!=data2[i]['indicator'] ){
                
                list_combs.push(lista)
                
                country_cur=data2[i]['country']
                indicator_cur=data2[i]['indicator']

                
              }*/
             
            for(let q=0;q<combos.length;q++){
              
              if(combos[q]['country']==data2[i]['country']&& combos[q]['indicator']==data2[i]['indicator']){
                lista['indicator'+q]=data2[i]['indicator']
                lista['country'+q]=data2[i]['country']
                lista['measure'+q]=data2[i]['measure'] 
              }

            }
            //lista.push(data2[i])
            
                

            }
          }
          //list_combs.push(lista)
          //list_combs.push(lista)
        
        list_combs[list_combs.length]=lista
        //k++
      
      
      
    
    console.log("O list_comb telikossss!! ",list_combs)
    for(let g=0;g<list_combs.length;g++){
      console.log('year ',list_combs[g].year," country0 ",list_combs[g].country0," indicator0 ",list_combs[g].indicator0," mesure0 ",list_combs[g].measure0)
      console.log('year ',list_combs[g].year," country1 ",list_combs[g].country1," indicator1 ",list_combs[g].indicator1," mesure1 ",list_combs[g].measure1)
      console.log('year ',list_combs[g].year," country2 ",list_combs[g].country2," indicator2 ",list_combs[g].indicator2," mesure2 ",list_combs[g].measure2)
      console.log('year ',list_combs[g].year," country3 ",list_combs[g].country3," indicator3 ",list_combs[g].indicator3," mesure3 ",list_combs[g].measure3)
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    }
    
    console.log("Data Ready<>!")
    //console.log(data.length);
  
    createGraph(choice_of_graph)
    //multibar()
  })
  function createGraph(choice)  {
    var id_=0
    var beg=0 
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 2200 ,
    height = 600 ;

var formatPercent = d3.format(".0");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

    
    
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
    if(choice==1){
      Multiline(width, height, margin, list_combs, x, y, xAxis, yAxis)
    }
    if(choice==2)
    {
      barChart(width, height, margin, list_combs, x, y, xAxis, yAxis);
    } 
    if(choice==3){
      Scatterplot(width, height, margin, list_combs, x, y, xAxis, yAxis);
    }
      
      
  }
    


})

button.addEventListener('click',()=>{
  
    if ($("svg").length > 0) {
      $("svg").remove();
    }
  console.log('me pathes!')

  min_yr=document.querySelector("#price-min").value
  max_yr=document.querySelector("#price-max").value
  console.log("min : ",min_yr," max : ",max_yr)
  group_by=group_yr
  choice_of_graph=isgraph
  combinations=selected_indicators.length * selected_countries.length
  q_countries=[]
  q_indicators=[]
  cou=[]
  ind=[]
  console.log('selected_countries.length',selected_countries.length)
  console.log('selected_indicators.length',selected_indicators.length)
  for (let i=0;i<selected_countries.length;i++){
    for (let j=0;j<selected_indicators.length;j++){
     
      combos.push({'country':selected_countries[i],'indicator':selected_indicators[j]})
    }
  }
  console.log(combos)
  

  country_string=""
  indicator_string=""
  for(let i=0;i<selected_countries.length;i++){
    
    q_countries.push(selected_countries[i])
    
    if(i==selected_countries.length-1){
      country_string+="\'"+q_countries[i]+"\' " 
    }else{
      country_string+="\'"+q_countries[i]+"\',"
    }
  
  }
  //country_string=q_countries.toString()
  //indicator_string=q_indicators.toString()

  console.log("country_string ",country_string)
  
  for(let i=0;i<selected_indicators.length;i++){
    
    q_indicators.push(selected_indicators[i])
    if(i==selected_indicators.length-1){
      indicator_string+="\'"+q_indicators[i]+"\' " 
    }else{
      indicator_string+="\'"+q_indicators[i]+"\',"
    }
    
   
  }
  
  console.log("indicator_string ",indicator_string)
  

  
  console.log("xwres ",q_countries.length)
  console.log("indicators ",q_indicators.length)
  if(q_indicators.length==0 || q_countries.length==0 || !( 1<=choice_of_graph<=3 ) ){
    console.log("q_indicators.length is "+q_indicators.length)
    console.log("q_countries.length is "+q_countries.length)
    console.log("choice_of_graph is "+choice_of_graph)
    window.alert("You have not select all fields!")
    return;
  }
  
  
  
  sql_query={"select":"","from":"","where":""}
  if(group_yr==1){
    sql_query["select"]=" country,indicator,year,measure "
    sql_query["from"]=" gdb_schema.country,gdb_schema.year,gdb_schema.indicator,gdb_schema.measurement "
    sql_query["where"]="country.country  in ("+country_string+") and indicator.indicator in("+indicator_string +")  and measurement.m_c_id = country.c_id and measurement.m_y_id = year.y_id and measurement.m_i_id = indicator.i_id   order by year,country,indicator;"

  }else if(group_yr==5 || group_yr==10 || group_yr==20){
    sql_query["select"]=" country,indicator,year,avg(measure) as measure "
    sql_query["from"]=" gdb_schema.country,gdb_schema.year,gdb_schema.indicator,gdb_schema.measurement "
    sql_query["where"]="country.country  in ("+country_string+") and indicator.indicator in("+indicator_string +") and year.year >="+min_yr+" and year.year<="+max_yr+"  and measurement.m_c_id = country.c_id and measurement.m_y_id = year.y_id and measurement.m_i_id = indicator.i_id   group by country,indicator,"+group_yr +"_yr order by year,country,indicator;"
  }else{
        window.alert("You have not select group way!")
        return;
  }
  socket.emit('request',JSON.stringify(sql_query))
  
  
  console.log("xwres ",q_countries.length)
  console.log("indicators ",q_indicators.length)
  var meas=0.0
  /*for(let i=0;i<q_countries.length;i++){
      for(let k=0;k<q_indicators.length;k++){
        lis=[]
        
        /*yr=min_yr
        console.log('##############')
        for(let j=1960;j<=max_yr;j+=group_by){
           if(j>=min_yr){
            console.log("etos ",j)
            let xwra=q_countries[i]
            //lis.push({'year':j,'country':""+q_countries[k],'indicator':""+q_indicators[k],'measure':meas})
            console.log('bbhkkaaa')
           }
        }
        list_combs.push([])
      }
      console.log('telos to ',i)
      
    
  }*/
  
  console.log('ETOIMA ESTALH')


  
})
function indicators_choice(i){
  if(!( selected_indicators.includes(indicator_list[i]))){
    selected_indicators.push(indicator_list[i])
  }else{
    selected_indicators=arrayRemove(selected_indicators,indicator_list[i])
  }
  console.log(selected_indicators)

  

}
function countries_choice(i){
  if(!( selected_countries.includes(country_list[i]))){
    selected_countries.push(country_list[i])
  }else{
    selected_countries=arrayRemove(selected_countries,country_list[i])
  }

  
}
function group_choice( i){
  if( i==1){
    
    group_yr=1
  }
  if(i==5){
    
    group_yr=5
  }
  if(i==10) {
    
    group_yr=10
  }
  if(i==20){
    
    group_yr=20
  }

}
function graph_choice(i){
  if( i==1){
   
    isgraph=1
  }
  if(i==2){
    
    isgraph=2
  }
  if(i==3) {
    
    isgraph=3
  }

}


function clone(selector) {
  var node = d3.select(selector).node();
  return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
}

  

  function showCheckboxes(id_) {
    var checkboxes = document.getElementById(id_);
    if (checkboxes.style.display == "none") {
      checkboxes.style.display = "block";
    } else {
      checkboxes.style.display = "none";
    }
  }
function tipwithId(id_){
  console.log(id_)
  return d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    console.log(d)
    return "<strong>measure:</strong> <span style='color:blue'>"+d[`measure${id_}`] +"    "+"<strong>indicators:</strong> <span style='color:red'>" + d['indicator'+id_]  +"    "+"<strong>Country:</strong>"+ "<span style='color:blue'>"+d[`country${id_}`]+"</span>"+"    "+"<strong>Year:</strong>"+ "<span style='color:orange'>"+d['year']+"</span>";
  })
}

function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}



function barChart(width, height, margin, list_combs, x, y, xAxis, yAxis)
{
  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var max =0
x.domain(list_combs.map(function(d) { return d.year; }));
y.domain([0, d3.max(list_combs, function(d) { 
  for(let i =0;i<list_combs.length;i++){
    if(max<d['measure'+i]){
      max =d['measure'+i];
    }
  }
  console.log('max   ',max)
  return max
})]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

bars=svg.selectAll(".bar")
    .data(list_combs)
  .enter()

  console.log(q_countries.length*q_indicators.length)
  for (id_=0;id_ < q_countries.length*q_indicators.length;id_++){

      
    var tip = tipwithId(id_)
    bars.append("rect").attr("class", 'bar'+id_)
    .attr("x", function(d) {
      
      
        return x(d.year)+(id_)*(x.rangeBand()/combinations);
    })

    .attr("width", x.rangeBand()/combinations)
    .attr("y", function(d) { 

      console.log('bar'+id_,d['year'],d['country'+id_],d['measure'+id_],d['indicator'+id_])

      let val=y(d['measure'+id_])
      
      if( y(d['measure'+id_])===NaN){
          val=0
      }
      val=parseFloat(y(d['measure'+id_])) || 0;
      return val; })
    .attr("height", function(d) {

      if( y(d['measure'+id_])===NaN){
          val=0
      }
      val=parseFloat(y(d['measure'+id_])) || 0;
        //console.log(d['measure'+id_],'measure'+id_,val)
        return  height - val; })
        .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      svg.call(tip);


      
      
    
  }
}



function Multiline(width, height, margin, list_combs){
  id_=0
  var	margin = {top: 30, right: 20, bottom: 30, left: 50}
	//width = width - margin.left - margin.right,
	//height = height - margin.top - margin.bottom;
 


// Set the ranges
var	x = d3.scale.linear().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

// Define the axes
var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom");
 
var	yAxis = d3.svg.axis().scale(y)
	.orient("left");
 
// Define the line

    
// Adds the svg canvas
var	svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var max =0
    //x.domain(list_combs.map(function(d) { return d.year; }));
    y.domain([0, d3.max(list_combs, function(d) { 
      for(let i =0;i<list_combs.length;i++){
        if(max<d['measure'+i]){
          max =d['measure'+i];
        }
      }
      console.log('max   ',max)
      return max
    })]);
    var line = svg.selectAll(".line")
      .data(list_combs)
      .enter()
// Get the data
console.log(list_combs)
  for (id_=0;id_ < q_countries.length*q_indicators.length;id_++){
    var tip = tipwithId(id_)
    console.log(tip)
    var	valueline = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d['measure'+id_]); });


      

    
      line.append("rect").attr("class", 'line'+id_)
      // Scale the range of the data
       x.domain(d3.extent(list_combs, function(d) { return d.year; }));
      //y.domain([0, d3.max(list_combs, function(d) { return d['measure'+id_]; })]);
    
      // Add the valueline path.
      svg.append("path")	
        .attr("class", "line"+id_)
        .attr("d", valueline(list_combs))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        svg.call(tip);
      // Add the X Axis
      svg.append("g")		
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
      // Add the Y Axis
      svg.append("g")		
        .attr("class", "y axis")
        .call(yAxis)
        
 

  }
}


function Scatterplot(width, height, margin, list_combs, xAxis, yAxis){
  var maxx =0;
  var maxy =0;
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
x = d3.scale.linear().range([0, width]) // value -> display
    
    x.domain([0, d3.max(list_combs, function(d) { 
      for(let i =0;i<list_combs.length;i++){
        console.log('d[measure0]',d['measure0'])
        if(maxx<d['measure0']){
          maxx =d['measure0'];
          
        }
      }return maxx
    })]);
    console.log('maxx',maxx)
var xValue = function(d) { return d.measure0;}, // data -> value
   
    
  
    xMap = function(d) { 
      console.log("%%%%#@@@@ ", x(d.measure0))
      console.log("%%%%#22@@@@ ", d.measure0)
      return x(d.measure0);}, // data -> display
    xAxis = d3.svg.axis().scale(x).orient("bottom");

// setup y
y = d3.scale.linear().range([height, 0]), // value -> display
y.domain([0, d3.max(list_combs, function(d) { 
  for(let i =0;i<list_combs.length;i++){
    if(maxy<d['measure1']){
      maxy =d['measure1'];
    }
  }return maxy
  
})]);
console.log('maxy',maxy)
var yValue = function(d) { return d.measure1;}, // data -> value
    
    yMap = function(d) { 
      console.log("%%%%#@@@@ ", y(d.measure1))
      console.log("%%%%#22@@@@ ", d.measure1)
      return y(d.measure1 );}, // data -> display
    yAxis = d3.svg.axis().scale(y).orient("left");

// setup fill color
var cValue = function(d) { return color(1,1,0);},//d.
    color = d3.scale.category10();

var cValue1 = function(d) { return color(1,0,0);},//d.
    color = d3.scale.category10();

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data


  // don't want dots overlapping axis, so add in buffer to data domain
  
  //xScale.domain([d3.min(data.measure0, xValue)-1, d3.max(data.measure0, xValue)+1]);
  //yScale.domain([d3.min(data.measure1, yValue)-1, d3.max(data.measure1, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(list_combs[list_combs.length -1]["indicator0"]);
      console.log('list_combs[indicator1]',list_combs["indicator0"])
  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(list_combs[list_combs.length -1]["indicator1"]);
    console.log('list_combs',list_combs)
    console.log('list_combs[indicator1]',list_combs[list_combs.length -1]["indicator1"])

  // draw dots
  svg.selectAll(".dot")
      .data(list_combs)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue1(d));}) //return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d.indicator0 +","+d.indicator1 +","+d.country0+ "<br/> (" + xValue(d.measure0) 
	        + ", " + yValue(d.measure1) + ")")//color(cValue1(d))
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

      // draw dots
      scat=svg.selectAll(".dot")
      .data(list_combs)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { color(cValue(d));}) //return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d.indicator0 +","+d.indicator1 +","+d.country0+ "<br/> (" + xValue(d.measure0) 
               + ", " + yValue(d.measure1) + ")")
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });


  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d['indicator0'];});

      



  
}


