import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252b2b",
  },
  categoryContainer: {
    marginTop: 2,
  },
  searchIcon: {
    marginLeft: 80,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#349beb",
    marginBottom: 10,
    marginLeft: 10,
  },
  contentContainer: {
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  contentTitle: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    color: "#fff",
  },
  videoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  videoPlayer: {
    width: "100%",
    height: 300,
  },
  icon: {
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 30,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerContainer: {
    flexDirection: "row",
  },
  banner: {
    flex: 1,
    height: 50,
    resizeMode: "cover",
  },
});

export default styles;
