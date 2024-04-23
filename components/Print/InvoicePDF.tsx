/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  PDFContainer: {
    width: "100%",
    height: "50vh", //As per your page layout
    fontSize: "16px",
  },
  page: {
    // flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    flexGrow: 1,
    borderStyle: "solid",
    borderWidth: 1,
  },
  table: {
    display: "flex",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "flex-start",
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCell: {
    fontSize: 10,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeader: {
    fontSize: 12,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
});

// Create PDF component
const MyDocument = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          fixed
        >
          <Text
            style={{ fontSize: "10px", marginLeft: "10px", marginTop: "6px" }}
          >
            {data.sample.sample_id}
          </Text>
          <Text
            style={{ fontSize: "10px", marginRight: "10px", marginTop: "6px" }}
          >
            {new Date().toLocaleString()}
          </Text>
        </View>
        <View style={styles.section}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderBottom: "1px solid #000",
            }}
            fixed
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Image
                src="/images/logo/logo.png"
                style={{ width: 100, height: 30 }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto ",
              }}
            >
              <Text
                style={{
                  fontWeight: "extrabold",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Trustin Analytical Solutions Private Limited
              </Text>

              <Text
                style={{
                  fontWeight: "light",
                  textAlign: "center",
                  fontSize: "7px",
                }}
              >
                R.K complex, First Floor, Plot No.303/B, B-Block
              </Text>
              <Text
                style={{
                  fontWeight: "light",
                  textAlign: "center",
                  fontSize: "7px",
                }}
              >
                Thiruneermalai Road, Parvathypuram{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "light",
                  textAlign: "center",
                  fontSize: "7px",
                }}
              >
                Chrompet, Chennai - 600044{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Test Report
              </Text>
            </View>
          </View>
          {/* <View>
            <Text>Invoice Number: 123456</Text>
            <Text>Date: January 1, 2024</Text>
          </View> */}

          <View>
            <View style={{ marginTop: 5, border: "1 solid #000" }}>
              <Text>Customer Information</Text>
            </View>

            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Company Name
              </Text>
              <Text>{data.sample.registration.company_name}</Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Address
              </Text>
              <Text>
                {data.sample.registration.customer_address_line1 +
                  " " +
                  data.sample.registration.customer_address_line2}
              </Text>
            </View>
            <View style={{ marginTop: 5, border: "1 solid #000" }}>
              <Text>Sample Information</Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Batch No
              </Text>
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                {data.sample.batch.batch_no}
              </Text>

              <Text style={{ borderRight: "1 solid #000", width: 100 }}>
                Batch Size
              </Text>
              <Text>{data.sample.batch.batch_size}</Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Mfg No
              </Text>
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                {new Date(
                  data.sample.batch.manufactured_date,
                ).toLocaleDateString()}
              </Text>

              <Text style={{ borderRight: "1 solid #000", width: 100 }}>
                Exp Size
              </Text>
              <Text>
                {" "}
                {new Date(data.sample.batch.expiry_date).toLocaleDateString()}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Test Method
              </Text>
              <Text>{data.sample.test_type_id === 2 ? "Mech" : "Micro"}</Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Product Name
              </Text>
              <Text>
                {data?.sample?.registration?.product_data?.product_name}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Product Code
              </Text>
              <Text>
                {data?.sample?.registration?.product_data?.product_code}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 1,
              }}
            >
              <Text style={{ borderRight: "1 solid #000", width: 180 }}>
                Date of Received
              </Text>
              <Text>
                {new Date(
                  data?.sample?.registration?.date_of_received,
                ).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 5 }}>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                fontWeight: "extrabold",
                fontSize: "14px",
              }}
            >
              <Text style={{ borderRight: "1 solid #000" }}>
                Parameter Name
              </Text>
              <Text style={{ borderRight: "1 solid #000" }}>
                Parameter Code
              </Text>
              <Text style={{ borderRight: "1 solid #000" }}>Method</Text>
              <Text style={{ borderRight: "1 solid #000" }}>Value</Text>
              <Text>Result</Text>
            </View>
            {data?.sample.sample_test_parameters.map((item, index) => (
              <View
                key={index}
                style={{
                  border: "1 solid #000",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  fontWeight: "bold",
                  fontSize: "12px",
                  gap: 1,
                }}
              >
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.test_parameter.testing_parameters}
                </Text>
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.test_parameter.parameter_code}
                </Text>
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.test_parameter.method_or_spec}
                </Text>
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.value}
                </Text>
                <Text>{item.result ? "Pass" : "Fail"}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              display: "flex",
              fontSize: 12,
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              Opinion and intrepretation (if any):
            </Text>
            <Text style={{ marginLeft: 20, textAlign: "left", fontSize: 10 }}>
              Requistion made by the customer with repect to the above test
              only.
            </Text>
          </View>

          <View
            style={{
              marginTop: 100,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              fontSize: 14,
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "right" }}>
              Authorized Signatory{" "}
            </Text>
          </View>
          <View
            style={{
              marginTop: 150,
              display: "flex",
              flexDirection: "column",
              fontSize: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              * This test report shall not be reproduced except in full, without
              written approval of the laboratory. *
            </Text>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              * The test results in this report refer only to the sample tested
              in the laboratory and the sample submitted by the party. *
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
