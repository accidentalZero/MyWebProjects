//- Вспомогательные функции для работы с матрицами
function MultiplyMatrix(A, B){
    //- Умножение матрицы на матрицу
    let rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (let i = 0; i < rowsA; i++) C[i] = [];
    for (let k = 0; k < colsB; k++)
     { for (let i = 0; i < rowsA; i++)
        { let t = 0;
          for (let j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
    return C;
}

function SubMatrix(A, B){
    //- Вычитание матриц
    var m = A.length, n = A[0].length, C = [];
    for (var i = 0; i < m; i++)
     { C[ i ] = [];
       for (var j = 0; j < n; j++) C[ i ][j] = A[ i ][j]-B[ i ][j];
     }
    return C;
}

function MatrixPow(A, n){ 
    //- Возведение матрицы в степень
    let result = A;
    for(let i = 0; i < n; i++){
        result = MultiplyMatrix(result, A);
    }
    return result;
}

function TransMatrix(A){
    //- Транспонирование матрицы
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[ i ] = [];
       for (var j = 0; j < m; j++) AT[ i ][j] = A[j][ i ];
     }
    return AT;
}

function Determinant(A){
    //-Поиск определителя матрицы
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function AdjugateMatrix(A){
    //- Получение матрицы алгебраических дополнений
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[ i ] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[ i ][j] = sign*Determinant(B);  
        }
     }
    return adjA;
}

function InverseMatrix(A){
    //- Получение обратной матрицы
    var det = Determinant(A);                
    if (det == 0) return false;
    var N = A.length, A = AdjugateMatrix(A); 
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[ i ][j] /= det; }
    return A;
}

function createMatrix(m, n, λ, μ){
    //- Генерация матрицы
    let matrix = new Array(m + n + 1);
    for(let i = 0; i < m+n+1; i++){
        matrix[i] = Array(m+n+1).fill(0);
    }
    
    for(let i = 0; i < m+n; i++){
        matrix[i][i+1] = λ;
        if(i < m){
            matrix[i+1][i] = μ * (i + 1);
        }
        else{
            matrix[i+1][i] = μ * m;
        }
    }
    return matrix
}

function printMatrix(A){
    //- Вывод матрицы на печать
    for(let i = 0; i < A.length; i++){
        console.log(A[i].join())
    }
}

function probability(matrix){
    //- Установившиеся вероятности - пукнт а
    let diag_res = Array(matrix.length).fill(0);
    for(let i = 0; i < matrix.length; i++){
        let sum = 0;
        for(let j = 0; j < matrix[i].length; j++){
            sum += matrix[i][j];
        }
        diag_res[i] = sum;
    }

    let D = new Array(diag_res.length);
    for(let i = 0; i < diag_res.length; i++){
        D[i] = Array(diag_res.length).fill(0);
        D[i][i] = diag_res[i];
    }
    
    let M = SubMatrix(TransMatrix(matrix), D);
    let M_ = M.map((x) => x);
    for(let i = 0; i < M_.length; i++){
        M_[M.length - 1][i] = 1;
    }
   
    let b_vector = Array(M_.length).fill(0);
    b_vector[b_vector.length-1] = 1;
    
    temp_v = new Array(b_vector.length);
    for(let i = 0; i < b_vector.length; i++){
        temp_v[i] = Array(1).fill(0);
        temp_v[i][0] = b_vector[i];
    }
    
    let X = MultiplyMatrix(InverseMatrix(M_), temp_v);
    
    
    let result = new Array(X.length);
    for(let i = 0; i < X.length; i++)
        result[i] = X[i][0]; 
    return result;
}

function averageLength(p){
    //- Средняя длина очереди - пункт d
    let sum = 0
    for(let i = 1; i < n+1; i++){
        sum += i * p[m+i];
    }
    return sum;
}

function averageTime(p, m, μ, n){
    //- Среднее время очереди
    let sum = 0;
    for(let i = 0; i < n; i++){
        sum += (i + 1) / (m * μ) * p[m + i];
    }
    return sum;
}

function busyChannels(p, m, n){
    let sum1 = 0;
    let sum2 = 0;
    for(let i = m + 1; i < m + n + 1; i++){
        sum1 += m * p[i];
    }
    for(let i = 1; i < m + 1; i++){
        sum2 += i * p[i];
    }
    return sum1 + sum2;
}

//- Подготовка данных
let m = 6;
let n = 11;
let λ = 23;
let μ = 6;
let matrix = createMatrix(m, n, λ, μ);

//- Вызов функций для выполнения
prob = probability(matrix)
console.log("Установившиеся вероятности:");
for(let i = 0; i < prob.length; i++)
    console.log(prob[i]);

console.log("Вероятность отказа в обслуживании:" + prob[prob.length-1]);
let relative = 1 - prob[prob.length-1];
console.log("Относительная интенсивность обслуживания:" + relative);
let absolut = (1 - prob[prob.length-1]) * λ
console.log("Абсолютная интенсивность обслуживания:" + absolut);
let avg_length = averageLength(prob);
console.log("Средняя длина очереди:" + avg_length);
let avg_time = averageTime(prob, m, μ, n);
console.log("Среднее время в очереди:" + avg_time);
busy_channels = busyChannels(prob, m, n);
console.log("Среднее число занятых каналов:" + busy_channels);
let sum = 0;
for(let i = 0; i < m; i++){
  sum += prob[i];
}
console.log("Вероятность того, что поступающая заявка не будет ждать в очереди:" + sum);
console.log("Среднее время простоя системы массового обслуживания:"+ 1 / λ);
console.log("Матрица интенсивностей:");
printMatrix(matrix);