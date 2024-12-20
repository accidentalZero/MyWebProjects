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

//- Функции отвечающие на вопросы задач 
 function task_1(matrix, k, i, j){
    let answer = MatrixPow(matrix, k);
    return answer[i-1][j-1];
}

function task_2(matrix, A, k){
    let result = MatrixPow(matrix, k);
    let v = new Array(A);
    return MultiplyMatrix(v, result)[0];
}

function task_3(matrix, k){
    let c_m = new Array(k);
    for(let i = 0; i < k; i++){
        c_m[i] = new Array(matrix.length);
        for(let j = 0; j < matrix.length; j++){
            c_m[i][j] = Array(matrix[0].length).fill(0);
        }
    } 
   
    for(let step = 0; step < k; step++){
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
                if(step == 0){
                    c_m[step][i][j] = matrix[i][j];
                }
                else{
                    for(let m = 0; m < matrix.length; m++){
                        if(m!=j){
                            c_m[step][i][j]+=matrix[i][m]*c_m[step-1][m][j];
                        }
                    }
                }
            }
        }
    }
    return c_m;    
}

function task_9(matrix, k){
    let c_m = TransMatrix(matrix);
    for(let i = 0; i < c_m.length; i++){
        c_m[i][i] -= 1;
        c_m[c_m.length - 1][i] = 1;
    }
    let tmp_m = Array(c_m.length).fill(0);
    tmp_m[tmp_m.length-1] = 1;
    temp_v = new Array(tmp_m.length);
    for(let i = 0; i < tmp_m.length; i++){
        temp_v[i] = new Array(1);
        temp_v[i][0] = tmp_m[i];
    }
    let X = MultiplyMatrix(InverseMatrix(c_m), temp_v);
    let result = new Array(X.length);
    for(let i = 0; i < X.length; i++)
        result[i] = X[i][0]; 
    return result; 
}


let matrix =new Array ( 
  new Array (0.13, 0.3, 0.37, 0, 0, 0.2, 0, 0, 0, 0),
  new Array (0, 0.05, 0.24, 0.09, 0.42, 0.2, 0, 0, 0, 0),
  new Array (0, 0.49, 0.18, 0.33, 0, 0, 0, 0, 0, 0),
  new Array (0.17, 0.07, 0.11, 0.32, 0.13, 0, 0.2, 0, 0, 0),
  new Array (0, 0, 0, 0.45, 0.13, 0, 0.33, 0.09, 0, 0),
  new Array (0, 0.35, 0, 0, 0.52, 0.06, 0, 0.07, 0, 0),
  new Array(0, 0, 0, 0.29, 0.22, 0, 0.05, 0.31, 0, 0.13),
  new Array(0, 0, 0.11, 0.14, 0, 0, 0.36, 0.24, 0.11, 0.04),
  new Array(0, 0, 0, 0, 0, 0, 0, 0.25, 0.09, 0.66),
  new Array(0, 0, 0, 0, 0, 0, 0, 0.49, 0.46, 0.05)
 );

console.log("вероятность того, что за 9 шагов система перейдет из состояния 4 в состояние 7:");
console.log(task_1(matrix, 9, 4, 7));

A = new Array(0.11,0,0.19,0.13,0.18,0.1,0.03,0.1,0.07,0.09);
console.log("Вероятности состояний системы спустя 6 шагов, если в начальный момент вероятность состояний были следующими:");
console.log(task_2(matrix, A, 6));

console.log("Вероятность первого перехода за 6 шагов из состояния 4 в состояние 2:");
console.log(""+task_3(matrix, 6)[5][3][1]);

console.log("Установившиеся вероятности:");
console.log(""+task_9(matrix));



