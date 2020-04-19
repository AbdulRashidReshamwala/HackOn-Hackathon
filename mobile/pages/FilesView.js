import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, Button } from 'react-native';

export default class FileTable extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigate;
        this.state = {
            tableHead: ['Filename', 'Address', 'Action'],
            tableData: this.props.files
        }
        console.log('files')
    }

    _alertIndex(index) {

        Alert.alert(`This is row ${index + 1}`);
    }

    renderRow(data) {
        return (

            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>


            </View>
        )
    }

    render() {
        const files = this.state.tableData;

        let dd = files.map((data) => {

            return (


                <View style={styles.containerok } key={data[0]}>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            paddingVertical: 15,
                            paddingHorizontal:12,
                            fontSize: 20, fontWeight: '400', width: '100 %', backgroundColor: '#FFF1C1', elevation: 3
                        }}>{data[0]}</Text>
                        {/* <Text>{data[1]}</Text> */}
                    </View>
                        <Button title={'View File'} onPress={() => this.navigate('File', { id: data[0] })} ></Button>
                </View>

            )
        })

        return (<View>

            {dd}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#00BFFF' },
    text: { margin: 6 },
    row: {
        height: 40, flexDirection: 'row', backgroundColor: '#FFF1C1'
    },
    btn: { width: 58, height: 28, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    containerok: {
        paddingTop: 10,

        marginHorizontal: 10
    },

});