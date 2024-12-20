import java.util.Arrays;

class MarkovProcesses{
    static double[][] probabilities;

    public static double probabilityTransition(int k, int i, int j){
        double kProbabilities[][] = Matrix.pow(probabilities, k);
        return kProbabilities[i-1][j-1];
    }

    public static double[][] probabilityTransition(int k){
        double kProbabilities[][] = Matrix.pow(probabilities, k);
        return kProbabilities;
    }

    public static double[] probabilityState(double[] A, int k){
        double kProbabilities[][] = Matrix.pow(probabilities, k);
        double[][] M = new double[1][A.length];
        M[0] = A;
        return Matrix.multiply(M, kProbabilities)[0];
    }

    public static double[][][] probabilityFirstTransition(int k){
        double c_m[][][] = new double[k][probabilities.length][probabilities[0].length];
        for(int step = 0; step < k; step++)
            for(int i = 0; i < probabilities.length; i++)
                for(int j = 0; j < probabilities[i].length; j++)
                    if(step == 0){
                        c_m[step][i][j] = probabilities[i][j];
                    }
                    else{
                        for(int m = 0; m < probabilities.length; m++)
                            if(m!=j){
                                c_m[step][i][j]+=probabilities[i][m]*c_m[step-1][m][j];
                            }                        
                    }                   
        return c_m;    
    }

    public static double probabilityFirstTransition(int k, int i, int j){
        return probabilityFirstTransition(k)[k-1][i-1][j-1];
    }
    
    

    public static double[][] probabilityFirstTransitionNotLater(int k){
        double tmp_data[][][] = probabilityFirstTransition(2000);
        double c_m[][] = new double[probabilities.length][probabilities.length];
        for(int i = 1; i < k+1; i++){
            c_m = Matrix.addition(c_m, tmp_data[i-1]);
        }
        return c_m;       
    }

    public static double probabilityFirstTransitionNotLater(int k, int i, int j){
        return probabilityFirstTransitionNotLater(k)[i-1][j-1];
    }    
    
    public static double[][] probabilityFirstTransitionAverageSteps(){
        double tmp_data[][][] = probabilityFirstTransition(2000);
        double c_m[][] = probabilities;        
        for(int i = 1; i < 2000; i++){ 
            c_m =  Matrix.addition(c_m, Matrix.multiply(tmp_data[i-1], i));
        }
        return c_m;       
    }

    public static double probabilityFirstTransitionAverageSteps(int i, int j){
        return probabilityFirstTransitionAverageSteps()[i-1][j-1];
    }

    

    public static double[][][] probabilityFirstReturn(int k){
        if (k == 1) {
            double res[][][] = new double[1][probabilities.length][probabilities[0].length];
            res[0] = probabilities;
            return res;
        }
        double c_m[][][] = new double[k][probabilities.length][probabilities.length];
        for(int i = 0; i < k; i++){
            c_m[i] = probabilityTransition(i+1);
        }                
        double fjj[][][] = c_m.clone();        
        for(int i = 1; i < k; i++){
            for(int j = 0; j < i; j++){ 
                fjj[i] = Matrix.subtraction(fjj[i], Matrix.multiplyLikeNp(fjj[j], c_m[i-j-1]));
            }
        }      
        
        return fjj;
    }

    public static double probabilityFirstReturn(int k, int i){
        return probabilityFirstReturn(k)[k-1][i-1][i-1];
    }

    public static double probabilityFirstReturnNotLater(int i, int k){        
        double sum = 0.0;
        for(int t = 1; t < k + 1; t++){
            sum += probabilityFirstReturn(t)[t-1][i-1][i-1];
        }
        return sum;    
    }

    public static double probabilityFirstReturnAverageSteps(int v){
        double tmp_data2[][][] = probabilityFirstReturn(1000);
        double sum = 0.0;
        for(int i = 1; i < 1001; i++){
            sum += i * tmp_data2[i-1][v-1][v-1];
        }
        return sum;
    }
        
     
    public static double[] steadyStateProbabilities(){
        double c_m[][] = Matrix.transposeMatrix(probabilities);
        for(int i = 0; i < c_m.length; i++){
            c_m[i][i] -= 1;
            c_m[c_m.length - 1][i] = 1;
        }
        double tmp_m[] = new double[c_m.length]; 
        tmp_m[tmp_m.length-1] = 1;

        double temp_v[][] = new double[tmp_m.length][1];
        for(int i = 0; i < tmp_m.length; i++)
            temp_v[i][0] = tmp_m[i];

        double X[][] = Matrix.multiply(Matrix.inverse(c_m), temp_v);
        double result[] = new double[X.length];
        for(int i = 0; i < X.length; i++)
            result[i] = X[i][0]; 
        return result;       
    }


    public static void main(String[] args){       
         //- Подготовка данных к работе
         probabilities = new double[][]{
           //1     2     3     4     5     6     7     8     9     10    11    12    13    14    
     {0.00, 0.31, 0.00, 0.00, 0.07, 0.00, 0.30, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00},// 1
     {0.53, 0.00, 0.28, 0.00, 0.11, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00},// 2
     {0.00, 0.00, 0.00, 0.71, 0.00, 0.00, 0.22, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00},// 3
     {0.00, 0.00, 0.00, 0.00, 0.75, 0.00, 0.09, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00},// 4
     {0.34, 0.06, 0.00, 0.07, 0.00, 0.00, 0.00, 0.18, 0.00, 0.00, 0.29, 0.00, 0.00, 0.00},// 5
     {0.01, 0.00, 0.00, 0.00, 0.36, 0.00, 0.00, 0.34, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00},// 6
     {0.17, 0.38, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.24, 0.00, 0.00, 0.00, 0.00},// 7
     {0.00, 0.00, 0.00, 0.00, 0.20, 0.00, 0.09, 0.00, 0.00, 0.00, 0.00, 0.63, 0.00, 0.00},// 8
     {0.00, 0.00, 0.00, 0.00, 0.00, 0.23, 0.20, 0.00, 0.00, 0.00, 0.00, 0.00, 0.09, 0.25},// 9
     {0.00, 0.00, 0.00, 0.00, 0.00, 0.17, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.42, 0.30},// 10
     {0.00, 0.00, 0.00, 0.00, 0.29, 0.18, 0.22, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.28},// 11
     {0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.50, 0.45, 0.00, 0.00, 0.00},// 12
     {0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.11, 0.29, 0.26, 0.00, 0.00, 0.00, 0.31},// 13
     {0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.79, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00} // 14
        };
        for(int i = 0; i < probabilities.length; i++){
            double sum = 0;
            for (double value: probabilities[i]) {
                sum += value;
            }
            probabilities[i][i] = 1 - sum;
        }        
        //- Задание №1
        System.out.print("Вероятность перехода из состояния 10 в 4 за 6 шагов: ");
        System.out.println(probabilityTransition(6, 10, 4));
        System.out.println();
        
        //- Задание №2
        double A[] = {0.14, 0.17, 0.1, 0.14, 0.01, 0.12, 0.08, 0.01, 0.08, 0.06, 0.07, 0.02};
        System.out.print("Вероятность состояния за 6 шагов: ");
        System.out.println(Arrays.toString(probabilityState(A, 6)));
        System.out.println();     
        
        
        //- Задание №3
        System.out.print("Вероятность первого перехода за 7 шагов из состояния 5 в состояние 9: "); 
        System.out.print(probabilityFirstTransition(7, 5, 9));
        System.out.println();
       
        //- Задание №4
        System.out.print("Вероятность перехода из состояния 7 в состояние 6 не позднее чем за 8 шагов: ");        
        System.out.println(probabilityFirstTransitionNotLater(8, 7, 6));    
        
        //- Задание №5
        System.out.print("Среднее количество шагов для перехода из состояния 4 в состояние 9: ");        
        System.out.println(probabilityFirstTransitionAverageSteps(4, 9));    
        
        
        //- Задание №6
        System.out.print("Вероятность первого возвращения в состояние 1 за 7 шагов: ");
        System.out.println(probabilityFirstReturn(7, 1)); 
        
        
        //- Задание №7
        System.out.print("Вероятность возвращения в состояние 1 не позднее чем за 8 шагов: "); 
        System.out.println(probabilityFirstReturnNotLater(1, 8));
        
        //- Задание №8
        System.out.print("Среднее время возвращения в состояние 6: "); 
        System.out.println(probabilityFirstReturnAverageSteps(6));
        
        //- Задание №9
        System.out.print("Установившиеся вероятности: "); 
        System.out.println(Arrays.toString(steadyStateProbabilities()));
        System.out.println();  
    }

        class Matrix{
            //- Класс для линейных операций над матрицами        

            public static double[][] multiply(double[][] A, double[][] B){
                //Метод умножения матриц;
                int l = A.length; // Количество строк в первой матрице
                int m0 = A[0].length; //Количество столбцов во второй маатрице
                int m1 = B.length;
                int n = B[0].length;       
                if(m0 != m1){
                    // Ничего не считаем, ошибка размерности матрицы
                }
                double result[][] = new double[l][n];
        
                for (int i = 0; i < l; i++) {
                    for (int j = 0; j < n; j++) {
                        for (int k = 0; k < m0; k++) {
                            result[i][j] += A[i][k] * B[k][j]; 
                        }
                    }
                }       
                return result;
            }

            public static double[][] multiply(double[][] A, double n){
                //Умножение матрицы на число       
                for (int i = 0; i < A.length; i++) {
                    for (int j = 0; j < A[0].length; j++) {
                        A[i][j] = n* A[i][j];                        
                    }
                }       
                return A;
            }

            public static double[][] multiplyLikeNp(double[][] A, double[][] B){
                //Метод умножения матриц в стиле numpy;
                int l = A.length; // Количество строк в первой матрице
                int m0 = A[0].length; //Количество столбцов во второй маатрице
                int m1 = B.length;
                int n = B[0].length;       
                if(m0 != m1){
                    // Ничего не считаем, ошибка размерности матрицы
                }
                double result[][] = new double[l][n];
        
                for (int i = 0; i < l; i++) {
                    for (int j = 0; j < n; j++) {
                        result[i][j] = A[i][j] * B[i][j];                        
                    }
                }       
                return result;
            }
        
            public static double[][] pow(double[][] A, int k){
                // Возведение матрицы в степень
                double[][] result = A;
                for(int i = 0; i < k-1; i++){
                    result = multiply(result, A);
                }
                return result;
            }

            public static double[][] addition(double[][] A, double[][] B){
                double C[][] = new double[A.length][A[0].length]; 
                for(int i = 0; i < A.length; i++){    
                    for(int j = 0; j < A[0].length; j++){    
                        C[i][j] = A[i][j] + B[i][j];
                    }
                }
                return C;
            }

            public static double[][] subtraction(double[][] A, double[][] B){
                double C[][] = new double[A.length][A[0].length]; 
                for (int i = 0; i < A.length; i++) {
                    for (int j = 0; j < A[0].length; j++){
                        C[i][j] = A[i][j] - B[i][j];
                    }
                }
                return C;
            }

            public static double[][] transposeMatrix(double [][] A){
                for (int i = 0; i < A.length; i++) {
                    for (int j = i+1; j < A.length; j++) {
                        double temp = A[i][j];
                        A[i][j] = A[j][i];
                        A[j][i] = temp;
                    }
                }
                return A;
            }

            public static double[][] inverse(double [][]A){
                double temp; 
                double[][] E = new double[A.length][A.length];
         
                for (int i = 0; i < A.length; i++)
                    for (int j = 0; j < A.length; j++){
                        E[i][j] = 0; 
                        if (i == j)
                            E[i][j] = 1;
                    }
         
                for (int k = 0; k < A.length; k++){
                    temp = A[k][k]; 
                    for (int j = 0; j < A.length; j++){
                        A[k][j] /= temp;
                        E[k][j] /= temp;
                    }
         
                    for (int i = k + 1; i < A.length; i++){
                        temp = A[i][k]; 
                        for (int j = 0; j < A.length; j++){
                            A[i][j] -= A[k][j] * temp;
                            E[i][j] -= E[k][j] * temp;
                        }
                    }
                }
         
                for (int k = A.length - 1; k > 0; k--){
                    for (int i = k - 1; i >= 0; i--){
                        temp = A[i][k]; 
                        for (int j = 0; j < A.length; j++){
                            A[i][j] -= A[k][j] * temp;
                            E[i][j] -= E[k][j] * temp;
                        }
                    }
                }
         
                for (int i = 0; i < A.length; i++)
                    for (int j = 0; j < A.length; j++)
                        A[i][j] = E[i][j];
                return A; 
            }
        
            public static void print(double[][] A){
                // Вывод матрицы на печать
                for(int i = 0; i < A.length; i++){
                    for(int j = 0; j < A[0].length; j++){
                        System.out.print(A[i][j] + " ");
                    }
                    System.out.println();
                }
            }
        }        
}