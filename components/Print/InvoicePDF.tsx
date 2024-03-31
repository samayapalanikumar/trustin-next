import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  PDFContainer: {
    width: "100%",
    height: "50vh", //As per your page layout 
},
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10, padding: 5, borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableHeader: { margin: 'auto', marginTop: 5, fontSize: 12, padding: 5, backgroundColor: '#F0F0F0', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
});

// Sample invoice data
const invoiceData = [
  { item: 'Product 1', price: 100 },
  { item: 'Product 2', price: 150 },
  { item: 'Product 3', price: 75 },
];

// Create PDF component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Invoice</Text>
        <Text>Invoice Number: 123456</Text>
        <Text>Date: January 1, 2024</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Item</Text>
            <Text style={styles.tableHeader}>Price</Text>
          </View>
          {invoiceData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.item}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;



// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// // Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default MyDocument