import { StyleSheet, Dimensions } from "react-native";
import COLORS from '../../Config/colorMap'
let screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        margin: 16,
        marginBottom: 8,
        padding: 16,
        elevation: 5,
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    subContainerOne: {
        flex: 1,
        marginRight: 5,
        padding: 3,
    },
    subContainerTwo: {
        flex: 5,
    },
    childContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containertwo: {
        backgroundColor: COLORS.WHITE,
        margin: 16,
        marginBottom: 8,
        padding: 16,
        elevation: 5,
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        height: screenHeight / 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainerOnetwo: {
        flex: 1,
        padding: 3,
    },
    subContainerTwotwo: {
        flex: 0.2
    },
    textStyle: {
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.DARK_GREY,
    },
    subContainerOneUser: {
        flex: 1,
        marginRight: 5,
        padding: 3,
    },
    subcontainerTwoUser: {
        flex: 5,
        justifyContent: 'center'
    },
    imageContainer: {
        height: 50,
        width: 50, resizeMode: 'contain'
    }


});
export default styles;
