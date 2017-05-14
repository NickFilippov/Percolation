function generateRandomUniformGrid(n){
    tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++){
            tempGrid[i][j]=Math.round(Math.random());
        }
    }
    return tempGrid;
}

function generateRandomGrid(n, k){
    tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++){
            tempGrid[i][j]=0;
            if (Math.random() < k)
                tempGrid[i][j]=1;

        }
    }
    return tempGrid;
}

function generateHorizontalLinesGrid(n){
    tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++) {
            tempGrid[i][j] = 0;
            if (i % 2 == 0)
                tempGrid[i][j] = 1;
        }
    }
    return tempGrid;
}

function generateVerticalLinesGrid(n){
    tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++) {
            tempGrid[i][j] = 0;
            if (j % 2 == 0)
                tempGrid[i][j] = 1;
        }
    }
    return tempGrid;
}

function generateRainGrid(n){
    tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++) {
            tempGrid[i][j] = 0;
            if (j % 2 == 0)
                tempGrid[i][j] = Math.round(Math.random());
        }
    }
    return tempGrid;
}

function generateChessGrid(n){
    var tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++) {
            tempGrid[i][j] = 0;
            if ((j+i) % 2 == 1)
                tempGrid[i][j] = 1;
        }
    }
    return tempGrid;
}

function generateSquareGrid(n) {
    tempGrid = new Array();
    for (i = 0; i < n; i++) {
        tempGrid[i] = new Array();
        for (j = 0; j < n; j++) {
            tempGrid[i][j] = 0;
        }
    }
    i_c = Math.floor(n / 2);
    j_c = Math.floor(n / 2);
    tempGrid[i_c][j_c] = 1;

    r = 5;
    b = 2;
    while (r<=n) {
        for (i = i_c - Math.floor(r / 2); i < i_c - Math.floor(r / 2) + r; i++)
            tempGrid[i][j_c + b] = 1;
        for (i = i_c - Math.floor(r / 2); i < i_c - Math.floor(r / 2) + r; i++)
            tempGrid[i][j_c - b] = 1;
        for (j = j_c - Math.floor(r / 2); j < j_c - Math.floor(r / 2) + r; j++)
            tempGrid[i_c + b][j] = 1;
        for (j = j_c - Math.floor(r / 2); j < j_c - Math.floor(r / 2) + r; j++)
            tempGrid[i_c - b][j] = 1;
        r = r + 4;
        b = b + 2;
    }
    return tempGrid;
}

function generateGradientGrid(n) {
    tempGrid=new Array(n);
    for(i=0;i<n;i++){
        tempGrid[i]=new Array(n);
        for(j=0;j<n;j++){
            tempGrid[i][j]= 0;
        }
    }

    for(i=0;i<Math.round(n/2);i++){

        for(j=0;j<Math.round(n/2);j++){
            tempGrid[i][j]= i+j+1;
        }
    }

   tempGrid1=new Array(n);
    for(i=0;i<n;i++){
        tempGrid1[i]=new Array(n);
        for(j=0;j<n;j++){
            tempGrid1[i][j]= 0;
        }
    }

    for ( k=0; k<n/2; k++) // border -> center
    {
        for ( j=k; j<n-1-k; j++) // left -> right
        {
            // меняем местами 4 угла

            tmp         = tempGrid[k][j];
            tempGrid1[k][j] = tempGrid[j][n-1-k];
            tempGrid1[j][n-1-k]     = tempGrid[n-1-k][n-1-j];
            tempGrid1[n-1-k][n-1-j] = tempGrid[n-1-j][k];
            tempGrid1[n-1-j][k]     = tmp;
        }
    }

    tempGrid2=new Array(n);
    for(i=0;i<n;i++){
        tempGrid2[i]=new Array(n);
        for(j=0;j<n;j++){
            tempGrid2[i][j]= 0;
        }
    }

    for ( k=0; k<n/2; k++) // border -> center
    {
        for ( j=k; j<n-1-k; j++) // left -> right
        {
            // меняем местами 4 угла

            tmp         = tempGrid1[k][j];
            tempGrid2[k][j] = tempGrid1[j][n-1-k];
            tempGrid2[j][n-1-k]     = tempGrid1[n-1-k][n-1-j];
            tempGrid2[n-1-k][n-1-j] = tempGrid1[n-1-j][k];
            tempGrid2[n-1-j][k]     = tmp;
        }
    }

    tempGrid3=new Array(n);
    for(i=0;i<n;i++){
        tempGrid3[i]=new Array(n);
        for(j=0;j<n;j++){
            tempGrid3[i][j]= 0;
        }
    }

    for ( k=0; k<n/2; k++) // border -> center
    {
        for ( j=k; j<n-1-k; j++) // left -> right
        {
            // меняем местами 4 угла

            tmp         = tempGrid2[k][j];
            tempGrid3[k][j] = tempGrid2[j][n-1-k];
            tempGrid3[j][n-1-k]     = tempGrid2[n-1-k][n-1-j];
            tempGrid3[n-1-k][n-1-j] = tempGrid2[n-1-j][k];
            tempGrid3[n-1-j][k]     = tmp;
        }
    }

    var e=addMatx(addMatx(tempGrid, tempGrid1, n), addMatx(tempGrid2, tempGrid3, n), n);
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            //alert(e[i][j]+" "+e[i][j]/(n+1));
            if ( Math.random() < (e[i][j]/(n+1)) ) {e[i][j] = 1;}
            else {e[i][j] = 0;}
        }
    }
    return e;
}

function generateHGrid (n){
    var m=new Array();
    for(i=0;i<n;i++){
        m[i]=new Array();
        for(j=0;j<n;j++) {
            m[i][j] = 0;
        }
    }

    var i, j, k = n;
    /////////////// Нижние столбцы

    for (i = 5; i < k; i = i + 8)
    {
        for (j = Math.floor(k/3+2); j < (k - 1); j++)
            m[j][i] = 1;
    }

    for (i = 3; i < k; i = i + 8)
    {
        for (j = Math.floor(k / 3 + 2); j < (k - 1); j++)
            m[j][i] = 1;
    }

    /////////////// Верхние столбцы

    for (i = 1; i < k; i = i + 8)
    {
        for (j = 1; j < Math.floor(2*k/3-1); j++)
            m[j][i] = 1;
    }

    for (i = 7; i < k; i = i + 8)
    {
        for (j = 1; j < Math.floor(2*k/3-1); j++)
            m[j][i] = 1;
    }


    //////////заполнение горизонт 1
    

    /* горизонт верх */

    for (j = 0; j < k; j++)
    m[Math.floor(k/3)][j] = 1;


    for (j = 0; j < k; j = j + 8)
        m[Math.floor(k / 3)][j] = 0;


    /* горизонт низ*/

    for (j = 0; j < k; j++)
        m[Math.floor(2*k / 3)][j] = 1;


    for (j = 4; j < k; j=j+8)
        m[Math.floor(2*k / 3)][j] = 0;
    //console.log(m);
    return m;
}

function generateCellGrid (n){
    var m=new Array();
    for(i=0;i<n;i++){
        m[i]=new Array();
        for(j=0;j<n;j++) {
            m[i][j] = 0;
        }
    }

    var i, j;
    /////////////// Слева направо (от верхней грани)
    var t=0;
    for (i = 0; i < n; i++){
        for (j = t; j < n; j = j + 8) {
            m[i][j] = 1;
            if ((j + 1) < n)
            {
                m[i][j+1] = 1;
            }
        }
        t=t + 1;
    }

    /////////////  Слева направо (от левой грани)

    t = 5;
    for (j = 0; j < n; j++)
    {
        for (i = t; i < n; i=i + 8)
        {
            m[i][j] = 1;
            if ((i + 1) < n)
            {
                m[i+1][j] = 1;
            }
        }
        t = t + 1;
    }

    //////////// Справа налево (от верхней грани)

    t = n - 1;

    for (i = 0; i < n; i++)
    {
        for (j = t; j >= 0; j = j - 8)
        {
            m[i][j] = 1;
            if ((j -1) >= 0)
            {
                m[i][j - 1] = 1;
            }
        }
        t = t - 1;
    }

    //////////// Справа налево (от правой грани)

    t = 5;
    for (j = n-1; j >= 0; j--)
    {
        for (i = t; i < n; i = i + 8)
        {
            m[i][j] = 1;
            if ((i + 1) < n)
            {
                m[i + 1][j] = 1;
            }
        }
        t = t + 1;
    }
    return m;
}

function generateXGrid(k) {
    var m=new Array();
    for(i=0;i<k;i++){
        m[i]=new Array();
        for(j=0;j<k;j++) {
            m[i][j] = 0;
        }
    }


    ///////////// Слева направо (от верхней грани)
    var t = 0, i, j;

    for (i = 0; i < k; i++)
    {
        for (j = t; j < k; j = j + 8)
        {
            m[i][j] = 1;
        }
        t = t + 1;
    }

    /////////////  Слева направо (от левой грани)

    t = 5;
    for (j = 0; j < k; j++)
    {
        for (i = t; i < k; i = i + 8)
        {
            m[i][j] = 1;
        }
        t = t + 1;
    }

    //////////// Справа налево (от верхней грани)

    t = k - 1;

    for (i = 0; i < k; i++)
    {
        for (j = t; j >= 0; j = j - 8)
        {
            m[i][j] = 1;
        }
        t = t - 1;
    }

    //////////// Справа налево (от правой грани)

    t = 5;
    for (j = k - 1; j >= 0; j--)
    {
        for (i = t; i < k; i = i + 8)
        {
            m[i][j] = 1;
        }
        t = t + 1;
    }

    return m;
}

function generateСircleGrid (n){
    var m = generateCellGrid(n);
    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++) {
            if ( m[i][j] == 1)
                m[i][j] = 0;
            else
                m[i][j] = 1;
        }
    }
    return m;
}

function generateShGrid(n) {
    m=new Array(n);
    for(i=0;i<n;i++){
        m[i]=new Array(n);
        for(j=0;j<n;j++) {
            m[i][j] = 0;
        }
    }
    var i, j;
    /////////////// Нижние столбцы

    for (i = 1; i < n; i = i + 4)
    {
        for (j = 3; j < (n - 1); j++)
            m[j][i] = 1;
    }


    /////////////// Верхние столбцы

    for (i = 3; i < n; i = i + 4)
    {
        for (j = 1; j < (n - 3); j++)
            m[j][i] = 1;
    }


    ////////////заполнение горизонт 1


    //верхние горизонт 1

    for (j = 0; j < 3; j++)
        m[1][j] = 1;


    for (j = 8; j < n - 5; j = j + 12)
    {
        m[1][j] = 1;
        m[1][j + 1] = 1;
        m[1][j + 2] = 1;
        m[1][j + 4] = 1;
        m[1][j + 5] = 1;
        m[1][j + 6] = 1;
    }

    //нижние горизонт 1

    for (j = 2; j < n - 5; j = j + 12)
    {
        m[n-2][j] = 1;
        m[n - 2][j + 1] = 1;
        m[n - 2][j + 2] = 1;
        m[n - 2][j + 4] = 1;
        m[n - 2][j + 5] = 1;
        m[n - 2][j + 6] = 1;

    }
    return m;
}

function addMatx( g1, g2, n){
    var temp=new Array(n);
    for(i=0;i<n;i++){
        temp[i]=new Array(n);
        for(j=0;j<n;j++){
            temp[i][j]=0;
            if (!(g1[i][j] === 0)) temp[i][j]=g1[i][j];
            if (!(g2[i][j] === 0)) temp[i][j]=g2[i][j];
        }
    }
    return temp;
}

function g111(n){
    tempGrid=new Array();
    for(i=0;i<n;i++){
        tempGrid[i]=new Array();
        for(j=0;j<n;j++) {
            tempGrid[i][j] = 0;
        }
    }
    tempGrid[0][0]=1;
    tempGrid[1][0]=1;
    tempGrid[2][0]=1;

    return tempGrid;
}