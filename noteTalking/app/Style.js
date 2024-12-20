import { StyleSheet } from 'react-native';

export default StyleSheet.create({  
    textInputStyle: {
        height: 40,    
        paddingLeft: 10,
        margin: 5,
        fontSize: 16,
    },
    valueInputStyle: {
        height: 50,    
        paddingHorizontal: 10,
        fontSize: 18,
        margin: 5,
    },
    calendarStyle: {
        paddingHorizontal: 10,
        margin: 10,
    },
    commonContainer: {   
        flex: 1,    
        padding: 10,
        backgroundColor: '#eeeaea'
    },
    valueTextStyle: {
        height: 25,    
        paddingHorizontal: 10,
        margin: 5,
        fontSize: 18,
        fontWeight: 'bold',        
    },
    card: {  
        backgroundColor: 'white',  
        borderRadius: 8,  
        paddingVertical: 5,  
        paddingHorizontal: 10,  
        width: '100%',  
        marginVertical: 10,  
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'space-between',    
        padding: 3,
        flexDirection:'row',
        alignItems:'center'
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardButtonContainer: {
        flexDirection: 'row',             
    },
    cardButton:{
        width: 30,
        height: 30,
        marginLeft: 10
    }, 
    bottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingVertical: 15,  
        paddingHorizontal: 25,      
    },
    bottomButton:{
        width: 30,
        height: 30,
    }, 
});