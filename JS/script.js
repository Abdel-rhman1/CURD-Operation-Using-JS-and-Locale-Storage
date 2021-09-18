var productName = window.document.getElementById("ProductName");
var productPrice = window.document.getElementById("ProductPrice");
var productCategory = window.document.getElementById("productCategory");
var productDescrition = window.document.getElementById("productDescrition");
var mainBtn = document.getElementById('mainBtn');
mainBtn.innerText = "Add New Product";
var productContainer;
if(localStorage.getItem("ProductList") == null){
    console.error("This Key dosent exist in the locale storage");
    productContainer = [];
}else{
    productContainer = JSON.parse(localStorage.getItem("ProductList"));
}
showProductsTable();
function addnewProduct(){
    if(productName.value == "" || productPrice.value  == "" || productCategory.value =="" ||
     productDescrition.value == ""){
            window.alert("Input must not be Empty Values");
    }else{
        if(mainBtn.innerText == "Update"){
            let index = document.getElementById("hiddenClass").value;
            productContainer[index].name = productName.value;
            productContainer[index].price = productPrice.value;
            productContainer[index].category = productCategory.value;
            productContainer[index].description = productDescrition.value;
        }else{
            var product = {
                name : productName.value,
                price : productPrice.value,
                category : productCategory.value,
                description : productDescrition.value,
            }
            productContainer.push(product);
        }
        
        localStorage.setItem("ProductList" , JSON.stringify(productContainer));
        console.log(productContainer);
        clearBntsContent();
        showProductsTable();
    }
   
} 
function clearBntsContent(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescrition.value = "";
}

function showProductsTable(){
    var products = ``;
    
    for(let i = 0;i < productContainer.length;i++){
        products += `<tr>
            <td> ${i+1}  </td> 
            <td>  ${productContainer[i].name}</td>
            <td> ${productContainer[i].price}</td>
           <td> ${productContainer[i].category}</td>
            <td> ${productContainer[i].description}</td>
            <td> 
                <button type="submit" onclick='updateProduct(${i})' class='btn btn-outline-info'> update </button>
                <button class='btn btn-outline-danger' onclick='deleteProduct("${i}")'> Delete </button>
            </td>
        </tr>`;  
    }
    document.getElementById("tableBody").innerHTML = products; 
}
function deleteProduct(id){
    var ans = window.confirm("Are you sure To delete This Product ");
    if(ans){
        productContainer.splice(id , 1);
        showProductsTable();
        localStorage.setItem("ProductList" , JSON.stringify(productContainer));
    }
}

function updateProduct(Produc){
    product = productContainer.indexOf(Produc);
    console.log(product);
}
function searchPrd(teram){
    var foundProtucts = ``;
    console.log(productContainer.length);
    for(let i = 0;i<productContainer.length;i++){
        if( productContainer[i].name.toLowerCase().includes(teram.toLowerCase()) ){
            foundProtucts += `<tr>
            <td> ${i+1}  </td> 
                <td>  ${productContainer[i].name}  </td>
                <td> ${productContainer[i].price} </td>
                <td> ${productContainer[i].category}  </td>
                <td> ${productContainer[i].description}  </td>
                <td> 
                    <button type="submit" onclick='updateProduct(${i})' class='btn btn-outline-info'> update </button>
                    <button class='btn btn-outline-danger' onclick='deleteProduct("${i}")'> Delete </button>
                </td>
            </tr>`; 
        }else{
            continue;
        }
    }
    document.getElementById("tableBody").innerHTML = foundProtucts; 
}
function updateProduct(index){
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDescrition.value = productContainer[index].description;
    window.document.getElementById("hiddenClass").value = index;
    mainBtn.innerText = "Update";

}