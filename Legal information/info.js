function show(){
    const contents = document.getElementById("contents");
    contents.style.display = contents.style.display === "none" ? "block" : "none"
}

let priviosId = null;

function block(id){
    const b = document.getElementById(id);
    if (priviosId !== null) {
        priviosId.style.display = priviosId.style.display === "none" ? "block" : "none";            
    }
    b.style.display = b.style.display === "none" ? "block" : "none";
    priviosId = b;
}