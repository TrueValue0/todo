import { Text, View, StyleSheet } from '@react-pdf/renderer';

export default function TableCol({ children }) {

    const styles = StyleSheet.create({
        tableCol: {
            border: "1px solid black",
            width: '100%',
        },
        tableCell: {
            textAlign: "center",
            width: '100%',
            fontSize: 10
        }

    });

    return (
        <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{children}</Text>
        </View>
    )
}