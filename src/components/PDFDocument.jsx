import React from 'react';
import { Image, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import TableCol from '@/components/pdf/TableCol';
// Create styles
import TableRow from '@/components/pdf/TableRow';

export default function MyDocument() {

    const style = StyleSheet.create({
        general: {
            paddingVertical: '10px',
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginVertical: '10px'
        },
        section: {
            width: '25%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            gap: '5px',
        },
        sectionCenter: {
            width: '40%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '60px',
        },
        subtitle: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        cuadrado: {
            fontSize: 10,
            border: "1px solid block",
            textTransform: "uppercase",
            paddingHorizontal: "10px",
            paddingVertical: "5px"
        }
    })

    return (
        <PDFViewer style={{ height: '100vh', width: '100vw' }}>
            <Document>
                <Page size='A3' style={{ marginTop: 280 }} >
                    <View style={style.general}>
                        <View style={style.header} >
                            <View style={style.section}>

                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={style.subtitle}>Fecha:</Text>
                                    <Text style={style.cuadrado}>Semana 22 mayo 2023</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={style.subtitle}>Comercial:</Text>
                                    <Text style={style.cuadrado}>Samanta</Text>
                                </View>
                            </View>


                            <View style={style.sectionCenter}>
                                <Text style={{ fontSize: 12, fontWeight: 'ultrabold', textDecoration: 'underline' }} >INFORME Y EVALUACION DE LAS CITAS CONCERTADAS</Text>
                                <View style={{ display: 'flex', gap: '5px' }}>
                                    <Text style={style.subtitle}>OBJETIVO BODEGA / URIARTE:</Text>
                                    <Text style={style.cuadrado}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel mollitia atque corporis. Ex distinctio beatae.</Text>
                                </View>
                            </View>

                            <View style={style.section}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={style.subtitle}>Fecha:</Text>
                                    <Text style={style.cuadrado}>Semana 22 mayo 2023</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={style.subtitle}>Comercial:</Text>
                                    <Text style={style.cuadrado}>Samanta</Text>
                                </View>
                            </View>
                        </View>
                        <TableRow backgroundColor='#a4a4eb' cols={["Visitas Programadas", "Objetivos Programados", "Propuesta de acciones y conclusiones"]} />
                        <TableRow cols={["React-PDF", "3-user", "2019-02-20 - 2020-02-19"]} />
                        <TableRow cols={["React-PDF", "3-user", "2019-02-20 - 2020-02-19"]} />
                        <TableRow cols={["React-PDF", "3-user", "2019-02-20 - 2020-02-19"]} />
                        <TableRow cols={["React-PDF", "3-user", "2019-02-20 - 2020-02-19"]} />

                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}