import { Dimensions } from "react-native";
import { Colors } from "../../constants";

export default {
  cardContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  coverContainer: {
    position: "relative"
  },
  coverImage: {
    height: Dimensions.get("window").width * (2 / 4),
    width: Dimensions.get("window").width
  },
  textinputstyle: {
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 2,
    borderRadius: 25
  },
  plainText: {
    flex: 1,
    color: "#432355",
    fontWeight: "bold",
    margin: 5
  },
  subcardImagecarousal: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  scroll: {
    backgroundColor: "#FFF",
    flex: 1,
    marginBottom: 55
  },
  productRow: {
    marginHorizontal: 25
  },
  mainviewStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column"
  },
  coverMetaContainer: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "flex-end"
    // marginBottom: 15,
    // marginRight: 15,
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    justifyContent: "center",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff200",
    flexDirection: "row",
    height: 65,
    alignItems: "center"
  },
  Detailfooter: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#432355",
    flexDirection: "row",
    height: 65,
    alignItems: "center"
  },
  buttonFooter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  card: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    borderBottomWidth: 0,
    margin: 10,
    marginTop: 5,
    borderColor: "lightgrey",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  subcardImage: {
    flex: 1,
    width: "auto",
    height: 120,
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  FirstTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    width: 200,
    marginVertical: 2
  },
  subTitle: {
    flex: 1,
    fontSize: 16,
    color: "#5b2fc6",
    fontWeight: "bold",
    flexDirection: "column",
    marginRight: 5
  },
  subprice: {
    color: "#5b2fc6",
    fontWeight: "bold",
    flex: 3,
    position: "absolute",
    right: 0,
    top: 0
  },
  SecondTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 2
  },
  subdistance: {
    flex: 1,
    marginRight: 5,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  substatus: {
    flex: 3,
    fontSize: 12,
    position: "absolute",
    right: 0,
    top: 0
  },
  ThridTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 2
  },
  cardRatings: {
    flex: 3,
    marginTop: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginBottom: 5
  },
  subreview: {
    flex: 3,
    position: "absolute",
    right: 0,
    top: 0,
    marginBottom: 5
  },
  selectedColor: {
    position: "absolute",
    right: 5,
    top: 5
  },
  iconleft: {
    marginRight: 5
  },
  cardImage: {
    flex: 1,
    width: "auto",
    height: 150,
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  detailbuttonFooter: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth: 1,
    elevation: 2,
    borderColor: "#ddd",
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  navigatorButton: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1
  },
  navigatorText: {
    color: "#432355",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "OpenSans-Regular",
    fontSize: 16
  },
  borderCenter: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#FFA890"
  },
  textFooter: {
    color: "#442555",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18
  },
  DetailtextFooter: {
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18
  },
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,
    color: "#492A5A",
    fontSize: 25,
    fontWeight: "400"
  },
  detailText: {
    marginBottom: 8,
    marginTop: 0,
    color: Colors.gray,
    fontSize: 16, // font size changes
    fontWeight: "300",
    letterSpacing: 0.5
  },
  subDetailText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 0.5
  },
  descriptionText: {
    marginBottom: 4,
    color: Colors.gray,
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1
  },
  samllcard: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    margin: 10,
    marginTop: 5,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  headerText: {
    color: "#492A5A",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "OpenSans-Regular",
    flex: 0,
    // alignItems: "center", // center horizontally
    paddingTop: 20,
    justifyContent: "center"
    //textAlign: "center"
  },
  priceperNight: {
    color: Colors.gray,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1
  },
  smallcardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15
  },
  smallpriceperNight: {
    color: Colors.gray,
    fontSize: 16,
    letterSpacing: 1,
    marginTop: 10
  },
  smallreview: {
    flex: 3,
    marginTop: 10,
    position: "absolute",
    right: 0,
    top: 0,
    marginBottom: 0
  },
  smallcardRatings: {
    flex: 1,
    marginTop: 15,
    marginLeft: "-5%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 0,
    height: 20,
    width: "100%"
  },
  datestyle: {
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70
  },
  dateslected: {
    color: "#636464",
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "500"
  },
  checkindate: {
    flexDirection: "column",
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center"
  },
  checkoutdate: {
    flexDirection: "column",
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center"
  },
  dateshow: {
    color: "#636464",
    fontSize: 16
  },
  datetimeshow: {
    color: "#636464",
    fontSize: 16
  },
  hrfirstline: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef"
  },
  hrlastline: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef"
  },
  checkinedit: {
    flexDirection: "column",
    marginLeft: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  checkoutedit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedvalue: {
    color: "#432355",
    fontSize: 19
  },
  checkguests: {
    flexDirection: "column",
    marginLeft: 15,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  feetextshow: {
    color: "#636464",
    fontSize: 14
  },
  iconright: {
    marginLeft: 5,
    backgroundColor: "#e8e8e8",
    width: 20,
    height: 20,
    borderRadius: 100,
    paddingLeft: 8,
    paddingTop: 2
  },
  invoiceprice: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  invoicevalue: {
    flexDirection: "column",
    marginLeft: 15,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  invoicepernight: {
    color: "#636464",
    fontSize: 16
  },
  invoicetotal: {
    color: "#636464",
    fontSize: 16,
    fontWeight: "500"
  },
  plainText: {
    flex: 1,
    color: "#432355",
    fontWeight: "bold",
    margin: 5
  },
  lableinput: {
    flex: 1,
    color: "#616161",
    fontWeight: "bold",
    margin: 5,
    marginLeft: 15,
    marginTop: "5%"
  },
  checktextinputstyle: {
    backgroundColor: "transparent",
    borderColor: "#d1d1d1",
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 15
  },
  headerTextcheck: {
    marginTop: 10,
    marginBottom: 5,
    letterSpacing: 1,
    color: "#492A5A",
    fontSize: 18,
    fontWeight: "500"
  },
  descriptionTextcheck: {
    marginBottom: 8,
    color: Colors.gray,
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1
  },
  headerTextcheckout: {
    marginTop: 10,
    marginBottom: 15,
    letterSpacing: 1,
    fontFamily: "OpenSans-Regular",
    color: "#492A5A",
    fontSize: 18,
    fontWeight: "500"
  },
  scrollprofile: { backgroundColor: "white" },
  liststyle: {
    marginTop: 15
    // height: "100%"
  },
  listItemContainer: {
    borderWidth: 0.5,
    paddingVertical: 20,
    borderBottomColor: "white",
    borderColor: "#ECECEC"
  },
  userName: {
    flexDirection: "column",
    margin: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  userblankspace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  userImage: {
    flexDirection: "column",
    marginRight: 15,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  bigbutton: {
    borderRadius: 19,
    marginHorizontal: "20%",
    height: 45,
    backgroundColor: "#fff200"
  },
  iconImage: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginBottom: 5
  }
};
