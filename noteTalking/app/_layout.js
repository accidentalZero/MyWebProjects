import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack>
            {/*options={{headerShown:false}}*/}
            <Stack.Screen name="index" options={{
                title: "Список звонков",
                headerStyle: {
                    backgroundColor: '#3d9699',                    
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',                   
                },
                headerTitleAlign: 'center',                
            }}/>
            <Stack.Screen name="edit/[id]" options={{
                title: "Редактирование",
                headerStyle: {
                    backgroundColor: '#3d9699',                    
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',                   
                },
                headerTitleAlign: 'center', }}/>
            <Stack.Screen name="view/[id]" options={{
                title: "Просмотр",
                headerStyle: {
                    backgroundColor: '#3d9699',                    
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',                   
                },
                headerTitleAlign: 'center', }}/>
        </Stack>
    )
}