import { Text, View, StyleSheet } from '@react-pdf/renderer';
import TableCol from '@/components/pdf/TableCol';

export default function TableRow({ cols, backgroundColor } = { backgroundColor: 'transparent' }) {

    const styles = StyleSheet.create({
        tableRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor,
        },
    });

    return (
        <View style={styles.tableRow}>
            {cols.map((item, index) => <TableCol key={index}>{item}</TableCol>)}
        </View>
    )
}