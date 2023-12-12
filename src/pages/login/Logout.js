export default function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cmid");
}