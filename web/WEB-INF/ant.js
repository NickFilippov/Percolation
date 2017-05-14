var table = "";
var mT = 0;
var colors=["#ffffff","#000000"];
function generateRandomGrid(n){
	tempGrid=new Array();
	for(i=0;i<n;i++){
		tempGrid[i]=new Array();
		for(j=0;j<n;j++){
			tempGrid[i][j]=Math.round(Math.random());
		}		
	}
	return tempGrid;
}

function find(x,labels){
	if(labels[x] == x){
		return x;
	}
	else{
		return find(labels[x],labels);
	}		
}
function union(x,y,labels){
	trueX=find(x,labels);
	trueY=find(y,labels);
	max=Math.max(trueX,trueY);
	min=Math.min(trueX,trueY);
	for(var i=0;i<labels.length;i++){
		if(labels[i] == max || labels[i] == min){
			labels[i] = min;
		}
	}
	return min;
}

function relabel(grid,labels){
	tempGrid=grid;
	N=grid[0].length;
	for(var i=0;i<N;i++){
		for(var j=0;j<N;j++){
			tempGrid[i][j]=labels[grid[i][j]];
		}
	}
	return tempGrid;
}

function HoshenKopelman(grid){
	var label = grid;
	largestLabel=1;
	N=grid[0].length;
	var labels = [0,1];
	for(var i=0;i<N;i++){
		for(var j=0;j<N;j++){
			if(grid[i][j]){
				left=((i == 0) ? 0 : label[i-1][j]);
				above=((j == 0) ? 0 : label[i][j-1]);
				if(left==0 && above==0){
					largestLabel++;
					labels.push(largestLabel);
					label[i][j]=largestLabel;
					if(largestLabel>1){
						colors.push(getRandomColor());
					}
				}
				else if(left !=0 && above == 0){
					label[i][j]=find(left,labels);
				}
				else if(left == 0 && above !=0){
					label[i][j]=find(above,labels);
				}
				else{
					label[i][j]=union(left,above,labels);
				}
			}
		}
	}
	return relabel(label,labels);
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeTable(grid,colors) {
	mT = grid[0].length;
	tdSize=Math.floor(((document.documentElement.clientHeight-200)/mT))+"px";
	td = "<td style = 'background-color:#ffffff; width:" + tdSize + "; height:" + tdSize + "'></td>";
	tHeader = "<table id = 'table' style = 'background-color:#cccccc'; border = 0.5px";
	document.write(tHeader);
	for (i = 0; i < mT; i++) {
 		document.write("<tr>");
 		for (j = 0; j < mT; j++) {
 			td = "<td style = 'background-color:"+colors[grid[i][j]]+"; width:" + tdSize + "; height:" + tdSize + "'></td>";
   			document.write(td);
  		}
  		document.write("</tr>");
 	}
 	document.write("</table>");
 	table = document.getElementById("table");
 	console.log(colors);
}

class Cell {
	constructor(i,j,label){
		this.i=i;
		this.j=j;
		this.label=label;
		this.pheromone=1;
		this.labelKo= (label == 0) ? 1: 2;
	}
	geti(){
		return this.i;
	}
	getj(){
		return this.j;
	}
	getCoords(){
		return this.i*10+this.j;
	}
	getPheromone(){
		return this.pheromone;
	}
	setPheromone(pheromone){
		this.pheromone=this.pheromone+pheromone;
	}
	setHardPheromone(pheromone){
		this.pheromone=pheromone;
	}
	getLabel(){
		return this.label;
	}
	setLabel(labl){
		this.label=labl;
	}
	isEqual(cell){
		if(cell.geti()==this.i && cell.getj()==this.j){
			return true;
		}
	}
}

class Ant {
	constructor(Qph, Qi, Ql){
	    this.Qph = Qph;
	    this.Qi = Qi;
	    this.Ql = Ql || 1;

	    this.row=0;
	    this.base = 0;
	    this.column=0;
	    this.walk = [];
	    this.pheromoneAmount=100;
	    this.addCellsCount=0;
	    this.pheromone=0;
	    this.curCell=null;
	    //this.walkLength = null;
	}

	getWalk(){
		return this.walk;
	}

	addCellsIncrement(){
		this.addCellsCount=this.addCellsCount+1;
	}

	getCellsCount(){
		return this.addCellsCount;
	}

	calculatePheromone(){
		this.pheromone=this.pheromoneAmount/(this.addCellsCount+0.5*this.walk.length);
	}

	setBase(base){
		this.base=base;
		this.column=base;
	}

	isVisited(cell){
		let cds=cell.getCoords();
		for(let i=0; i<this.walk.length-1;i++){
			if(cds==this.walk[i].getCoords()){
				return true;
			}
		}
		return false;
	}

	doWalk(cellGrid){
		if(cellGrid[this.row][this.column].getLabel()==0){
			this.addCellsCount++;
		}
		this.walk.push(cellGrid[0][this.base]);		
		while(this.column!=cellGrid[0].length-1){
			let nextCell=this.chooseNext(cellGrid);
			if(!nextCell){
				//console.log('something wrong!');
				return null;
			}
			this.walk.push(nextCell);
		}
		console.log("walk_length: "+this.walk.length);
		this.calculatePheromone();
		this.layPheromones();
		return 1;
		/*
		for(let i=0; i<this.walk.length - 1; i++){
			this.layPheromones(this.walk[i]);
		}		*/
	}

	chooseNext(cellGrid,curCell){
		let probs=[];
		let curi=this.row;
		let curj=this.column;
		let N = cellGrid[0].length;
		if(curi+1<N/* && !cellGrid[curi+1][curj].isEqual(this.walk[this.walk.length-1])*/ && !this.isVisited(cellGrid[curi+1][curj])){
			probs.push(cellGrid[curi+1][curj]);
		}
		if(curj+1<N/* && !cellGrid[curi][curj+1].isEqual(this.walk[this.walk.length-1])*/ && !this.isVisited(cellGrid[curi][curj+1])){
			probs.push(cellGrid[curi][curj+1]);
		}
		if(curi-1>=0/* && !cellGrid[curi-1][curj].isEqual(this.walk[this.walk.length-1])*/ && !this.isVisited(cellGrid[curi-1][curj])){
			probs.push(cellGrid[curi-1][curj]);
		}
		if(curj-1>=0/* && !cellGrid[curi][curj-j].isEqual(this.walk[this.walk.length-1])*/ && !this.isVisited(cellGrid[curi][curj-1])){
			probs.push(cellGrid[curi][curj-1]);
		}

		if(probs.length>4){
			console.log('some shit happened with: cells for choose count');
		}
		if(probs.length==0){
			console.log('probs is empty!');
			return null;
		}

		//Вычисление вероятностей для выбора след ячейки, ТУДУ: подобрать коэффициенты Qph,Qi,Ql
		let sumall=0;
		for(let k=0;k<probs.length;k++){
			sumall=sumall+Math.pow(probs[k].pheromone,this.Qph)*Math.pow(((probs[k].getj()>curj)?2:1),this.Qi)*Math.pow(probs[k].labelKo,this.Ql);
		}

		let prs=[];
		for(let k=0;k<probs.length;k++){
			let mul=Math.pow(probs[k].pheromone,this.Qph)*Math.pow(((probs[k].getj()>curj)?2:1),this.Qi)*Math.pow(probs[k].labelKo,this.Ql);
			prs.push(mul/sumall);
		}

		let rnd = Math.random();
		let x = 0;
		let tally = prs[x];
		while (rnd > tally && x < prs.length - 1) {
			tally += prs[++x];
		}
		if(probs[x].getLabel() == 0){
			this.addCellsCount++;
		}
		this.row=probs[x].geti();
		this.column=probs[x].getj();
		return probs[x];
	}
	layPheromones(){
		this.calculatePheromone();
		for(let i=0; i<this.walk.length; i++){
			this.walk[i].setPheromone(this.pheromone);
		}
	}
}

function buildCellGrid(sgrid){	
	let L = sgrid[0].length;
	let cellgrid=new Array(L);
	for (let i=0;i<L;i++){
		cellgrid[i]=new Array(L);
		for (let j=0;j<L;j++){
			cellgrid[i][j]=new Cell(i,j,sgrid[i][j]);
		}
	}
	return cellgrid;
}

function buildGrid(cgrid){
	let grid = new Array();
	let len=cgrid[0].length;
	for(let i=0;i<len;i++){
		grid[i]=new Array();
		for(let j=0; j<len; j++){
			grid[i][j]=cgrid[i][j].getLabel();
		}
	}
	return grid;
}
class Colony {
	constructor(popSize,iterations,cellGrid,Qph,Qi,Ql,pho) {
		this.popSize=popSize;
		this.iterations=iterations;
		this.cellgrid=cellGrid;
		this.gridsize=cellGrid[0].length;
		this.Qph=Qph;
		this.Qi=Qi;
		this.Ql=Ql;
		this.pho=pho;

		this.population=[];

		this.bestWay=[];
		this.bestCellsCount=10000000;

	}
	getBestCellsCount(){
		return this.bestCellsCount;
	}
	getWalk(i){
		return this.population[i].getWalk();
	}
	initialise(){
		this.population=[];
		for(let i = 0; i < this.popSize; i++) {
	      this.population[i] = new Ant(this.Qph, this.Qi, this.Ql);
	    }
	}

	evaporatePheromones(){
		for(i = 0; i<this.gridsize;i++){
			for(j=0; j<this.gridsize; j++){
				let ph=(1-this.pho)*this.cellgrid[i][j].getPheromone();
				if(ph<1) ph=1;
				this.cellgrid[i][j].setPheromone(ph);
			}
		}
	}

	sendOutAnts() {
	    for(let i = 0; i < this.popSize; i++) {
	      //console.log('Ant', i, this.population[i]);
	    	if(this.population[i].doWalk(this.cellgrid)){
	    		console.log(this.population[i].getCellsCount());
	    		if (this.population[i].getCellsCount()<this.bestCellsCount){
			      	this.bestCellsCount=this.population[i].getCellsCount();
			      	this.bestWay=this.population[i].getWalk();
	    		}
	  		}
	    this.evaporatePheromones();
	    }	    
	}

	drawPath(){
		var colors=["#ffffff","#808080","#ff0000","#000000"];
		for(let i=0; i<this.bestWay.length;i++){
			let curi=this.bestWay[i].geti();
			let curj=this.bestWay[i].getj();
			if(this.cellgrid[curi][curj]==0){
				this.cellgrid[curi][curj].setLabel(2);
			}
			if(this.cellgrid[curi][curj]==1){
				this.cellgrid[curi][curj].setLabel(3);
			}
		}
		var pathgrid=buildGrid(this.cellgrid);
		makeTable(pathgrid,colors);
	}

}

var _data;
function draw_grid(data, upd, way) {
    var width = 600;
    var height = 600;
    var grid_length = data[0].length;
    var width_cell = width/grid_length;
    var height_cell = height/grid_length;

    var canvas = document.getElementById("grid")
    if (canvas == null) {
        canvas = document.createElement('canvas');
        canvas.id = "grid";
        canvas.width = width;
        canvas.height = height;
        document.getElementsByTagName('body')[0].appendChild(canvas);
    }

    var context = canvas.getContext("2d");
    
    function draw_cells(way){
        
        for (var i = 0; i < grid_length; i++) {
            for (var ii = 0; ii < grid_length; ii++) {
                if (upd){
	                if (_data && _data[i][ii] === color_for_cell(data[i][ii])) {
	                    continue;
	                }
            	} 
                context.clearRect(i*width_cell, ii*height_cell, width_cell, height_cell);
                context.fillStyle = color_for_cell(data[i][ii]);
                context.strokeStyle= "rgb(200,200,200)";
                context.fillRect(i*width_cell, ii*height_cell, width_cell, height_cell);
                context.strokeRect(i*width_cell, ii*height_cell, width_cell, height_cell);
            }
        }
        
        if (way){
	        for(var j=0;j<way.length;j++){
	        	i=way[j].geti();
	        	ii=way[j].getj();
	        	context.clearRect(i*width_cell, ii*height_cell, width_cell, height_cell);
	        	if(way[j].getLabel()==0){
	        		context.fillStyle = "rgb(255,0,0)";
	        	}
	        	else{
	        		context.fillStyle = "rgb(0,0,0)";
	        	}
	            context.strokeStyle= "rgb(200,200,200)";
	            context.fillRect(i*width_cell, ii*height_cell, width_cell, height_cell);
	            context.strokeRect(i*width_cell, ii*height_cell, width_cell, height_cell);
	        }
	    }
    }
    draw_cells(way);
    /*
    if (!_data) {
        _data = [];
    }
    for (var i = 0; i < grid_length; i++) {
        _data[i] = [];
        for (var ii = 0; ii < grid_length; ii++){
            _data[i][ii] = color_for_cell(data[i][ii]);
        }
    }*/
}

function update_grid(data) {
    draw_grid(data,1);
}

var color_for_cell = function (cell) {
    if(cell.getLabel()){
    	return "rgb(120,120,120)";
    }
    else {
    	return "rgb(255,255,255)";
    }
}