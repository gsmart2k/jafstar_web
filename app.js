const express = require("express")
const session = require("express-session")
const PORT = process.env.PORT || 4000
const Users = require("./models/users")
const Storeitems = require("./models/storeitems")
const Photomodels = require("./models/photomodels")
const mongoose = require("mongoose")
const { result } = require("lodash")
const paypal = require("paypal-rest-sdk")
       
var app = express();

paypal.configure({
    'mode':'sandbox', //Change to live when you are ready to go live
    'client_id':'AbdHpF-o5VWWyYybjCAfmaWmOY3Ji7oj1SLYm5osL9HewkpSBvnsJ7YW4awKiPFF7KOyOEDIS3Ej8dc1',
    'client_secret':'EPXHZ_63Iuq3LQRlJgZ-K96bNcLLkCTikeuMYKLiT7q7WNdwDnsfv8NE5_52sBMHOQNa2r7AX4fUbQWk'
});



// var paystack = require("paystack-api")("sk_test_4b02091e5157d69965f309d426cb82d435029f2f");

const uri = "mongodb+srv://Gsmart:Fatherwell2000@cluster0.ojslx.mongodb.net/JafstarDb?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

mongoose.connection.once("open",()=>{
    console.log("Connection has been made!!!")
}).on('error',()=>{
    console.log('error')
})

var alertmsg = ""

// Photomodels.insertMany([{Modelname:"Fortune", Modelimages:["assets/Fortune/DSC_7417.jpg","assets/Fortune/DSC_7417.jpg","assets/Fortune/DSC_7438.jpg","assets/Fortune/DSC_7444.jpg","assets/Fortune/DSC_7474.jpg","assets/Fortune/DSC_7454.jpg"] },
// {Modelname:"Diwura", Modelimages:["assets/Diwura/DSC_0237.jpg","assets/Diwura/DSC_0295.jpg","assets/Diwura/DSC_0255.jpg","assets/Diwura/DSC_0270.jpg","assets/Diwura/DSC_0310.jpg","assets/Diwura/DSC_0332.jpg"]},
// {Modelname:"Inioluwa", Modelimages:["assets/inioluwa/Finished/DSC_1752.jpg","assets/inioluwa/Finished/DSC_1767.jpg","assets/inioluwa/Finished/DSC_1772.jpg","assets/inioluwa/Finished/DSC_1798.jpg","assets/inioluwa/Finished/DSC_1854.jpg","assets/inioluwa/finished/DSC_1896.jpg"]},
// {Modelname:"Janet", Modelimages:["assets/Janet/DSC_3093.jpg","assets/Janet/DSC_3101.jpg","assets/Janet/DSC_3163.jpg","assets/Janet/DSC_3171.jpg","assets/Janet/DSC_3370.jpg","assets/Janet/DSC_3404.jpg"] },
// {Modelname:"Amanda", Modelimages:["assets/Amanda/DSC_7299.jpg","assets/Amanda/DSC_7362.jpg","assets/Amanda/DSC_7295.jpg","assets/Amanda/DSC_7255.jpg","assets/Amanda/DSC_7261.jpg","assets/Amanda/DSC_7266.jpg"] }])
// const newitem = new Storeitems({
//     Itemname:"Chaotic Night Dark",
//     Itemprice:30,
//     Itemimage:"assets/Landscape Painting_Chaotic Night.jpg"
// })

// newitem.save().then(()=>{
//     console.log("Record Saved")
// })

app.set('trust proxy', 1)
app.set('view engine', 'ejs')
app.use(session({
    secret:"Some texts",
    resave: false,
    saveUninitialized: true
}));
app.use('/:name', express.static('public'))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}));

// var online = "";

// Users.find({Name:online}).then((result)=>{
//     console.log(result)
// })


function routeProtect(req, res, next) {
    if(req.session.name){
        next()
    }else{
        res.redirect("/login")
        // res.json({msg:"Please Login First !"})
        // res.redirect("/login")
    }
}
// function cartLength(req, res, next) {
//     if(req.session.name){
//         Users.find({Name:req.session.name}).then((result)=>{
//             var usercartlength = result[0].Cartcontent.length
//             next()
//             return usercartlength;
//         })
//     }
// }

// console.log(cartLength())


var arts = [
    {id:1, name:"Summer Adventures", price:25, image: "assets/Landscape Painting_Ocean_Day.jpg"},
    {id:2, name:"Chaotic Night", price:35, image: "assets/Landscape Painting_Chaotic Night_.jpg"},
    {id:3, name:"Dooms Day", price:40, image: "assets/Landscape Painting_Chaotic Night.jpg"},
    {id:4, name:"Lonely Night", price:50, image: "assets/Landscape Painting_Mountain_Night.jpg"}
]
var uses = [
    {id:'1', name:"ogunrinade", password:"gbolahan", cartContent:[]},
    {id:'2', name:"sam", password:"father", cartContent:[]},
    {id:'3', name:"yemi", password:"Samson", cartContent:[]},
    {id:'4', name:"bode", password:"check", cartContent:[]},
]
var models = [
    {id:1, name:"Fortune", images:["assets/Fortune/DSC_7417.jpg","assets/Fortune/DSC_7417.jpg","assets/Fortune/DSC_7438.jpg","assets/Fortune/DSC_7444.jpg","assets/Fortune/DSC_7474.jpg","assets/Fortune/DSC_7454.jpg"] },
    {id:2, name:"Diwura", images:["assets/Diwura/DSC_0237.jpg","assets/Diwura/DSC_0295.jpg","assets/Diwura/DSC_0255.jpg","assets/Diwura/DSC_0270.jpg","assets/Diwura/DSC_0310.jpg","assets/Diwura/DSC_0332.jpg"]},
    {id:3, name:"Inioluwa", images:["assets/inioluwa/Finished/DSC_1752.jpg","assets/inioluwa/Finished/DSC_1767.jpg","assets/inioluwa/Finished/DSC_1772.jpg","assets/inioluwa/Finished/DSC_1798.jpg","assets/inioluwa/Finished/DSC_1854.jpg","assets/inioluwa/finished/DSC_1896.jpg"]},
    {id:4, name:"Janet", images:["assets/Janet/DSC_3093.jpg","assets/Janet/DSC_3101.jpg","assets/Janet/DSC_3163.jpg","assets/Janet/DSC_3171.jpg","assets/Janet/DSC_3370.jpg","assets/Janet/DSC_3404.jpg"] },
    {id:5, name:"Amanda", images:["assets/Amanda/DSC_7299.jpg","assets/Amanda/DSC_7362.jpg","assets/Amanda/DSC_7295.jpg","assets/Amanda/DSC_7255.jpg","assets/Amanda/DSC_7261.jpg","assets/Amanda/DSC_7266.jpg"] }
]




function deleteAnItem (item){
    // here we get the item name through the function, and query
    // it from the database, and delete
// users.cartContent.filter(function(value) {
//         return value !== food ; });
}

app.get("/", (req,res)=>{
    res.render("index.ejs",{name:req.session.name})
})
app.get("/transaction/initialize/:reference", (req,res)=>{

})

app.get("/about", (req,res)=>{
    Users.find({Name:req.session.name}).then((result,err)=>{
        if(result.length != 0){
            var cartitems = result[0].Cartcontent
            var total = 0;
            var numberofitemsincart = cartitems.length
            res.render("about.ejs",{name:req.session.name, noofitems:numberofitemsincart})
        }else{
            res.render("about.ejs",{name:req.session.name})
        }
    })

})
app.get("/artstore", (req , res)=>{
       Users.find({Name:req.session.name}).then((result,err)=>{
        if(result.length != 0){
            var cartitems = result[0].Cartcontent
            var total = 0;
            var numberofitemsincart = cartitems.length
            Storeitems.find({}).then((result)=>{
                res.render("artstore.ejs", {data:result,noofitems:numberofitemsincart, name:req.session.name, alertmsg:"", err:req.session.newerror})
            })
        }else{
            Storeitems.find({}).then((result)=>{
                res.render("artstore.ejs", {data:result, name:req.session.name,alertmsg:"", err:req.session.newerror})
                })
        }
        
    })

})


app.get("/artstore/edit/:name",(req,res)=>{

    var art = arts.find(mod=>
        mod.name ===  req.params.name   
        )
    if(art) {
        if(req.query.Newname){
            art.name = req.query.Newname
            art.price = req.query.Newprice
        }else if(!req.query.Newname){
            art.name = art.name
            art.price = req.query.Newprice
        }else if(req.query.Newprice){
            art.name = req.query.Newname
            art.price = req.query.Newprice
        }else if(!req.query.Newprice){
            art.name = req.query.Newname
            art.price = art.price
        }
    res.redirect("/artstore")
    }else{
    res.render("errorpage.ejs")
    }  
})
app.get("/artstore/delete/:name", (req,res)=>{
    var art = arts.find(mod=>
        mod.name ===  req.params.name   
        )
    if(art) {
        let new_array = arts.filter(function(value) {
            return value !== art ; });
            arts = new_array
            // console.error(new_array)
        // models.filter(c=> c.name !== model.name)
    res.redirect("/artstore")
    }else{
    res.render("errorpage.ejs")
    } 
})
app.get("/artstore/:name", (req,res)=>{
        // var art = arts.find(c=>
        //     c.name === req.params.name
        // );
        Users.find({Name:req.session.name}).then((result,err)=>{
            if(result.length != 0){
                var cartitems = result[0].Cartcontent
                var total = 0;
                var numberofitemsincart = cartitems.length
                // res.render("errorpage.ejs",{name:req.session.name, noofitems:numberofitemsincart})
            }else{
                // res.render("errorpage.ejs",{name:req.session.name})
            }
            
            Storeitems.find({Itemname:req.params.name}).then((result,err)=>{
                if(result.length != 0) {
                    res.render("artstoredetailspage.ejs", {name:req.session.name,data:result[0], noofitems:numberofitemsincart})
                }else{
                    res.render("errorpage.ejs")
                } 
            })
        })

})
app.get("/cart", (req,res)=>{
    Users.find({Name:req.session.name}).then((result,err)=>{
        console.log(result[0]._doc.Cartcontent)
        if(result.length != 0){
            var cartitems = result[0].Cartcontent
            var total = 0;
            var numberofitemsincart = cartitems.length
            for(var i = 0; i<cartitems.length; i++){
                total = total + cartitems[i].Itemprice
            }
            res.render('cart.ejs',{name:req.session.name, noofitems:numberofitemsincart, data:result[0].Cartcontent, itemstotal:total})
            // total.forEach(element => {
        }else{
            res.render('cart.ejs',{name:req.session.name})
            console.log("NO ONE LOGGED IN")
        }
        //     var ans = 0;
        //     ans = ans + element.Itemprice
        // });
    })
});
app.get("/cart/add/:name",routeProtect, (req, res) =>{
    Storeitems.find({Itemname:req.params.name}).then((re)=>{
        if(re.length != 0){
            Users.find({Email:req.session.email}).then((result)=>{
                var cartitems = result[0].Cartcontent
                var numberofitemsincart = cartitems.length
                if(result.length != 0){
                    var carts = result[0].Cartcontent
                    var validate = false;
                    for (let elements of carts) {
                        var elementname = elements.Itemname
                    }
                    if(elementname === req.params.name){
                        validate = false
                        alertmsg = "Item Already in Cart !"
                        res.redirect("/artstore")
                        // res.render("artstore.ejs",{data:result[0].Cartcontent, noofitems:numberofitemsincart, name:req.session.name, alertmsg:"Item Already In Cart"})
                        
                    }else{
                        Users.updateOne({Name:req.session.name},{$push:{Cartcontent:{Itemname:re[0].Itemname,Itemprice:re[0].Itemprice, Itemimage:re[0].Itemimage}}}).then((result, err)=>{
                            res.redirect("/artstore")
                        })
                    }
                    // if(validate = true){
                          
                    // }
                    
                }
                
            })
        }else{
            res.redirect("/errorpage")
            // console.log("No result Found")
        }
        
    })
    

//     var state = ""
//    let newCartFood = foodDatabase.find(c=> 
//     c.foodId === req.params.id )
//     // console.log(cartDatabase.)
//     cartDatabase.forEach(cartItem =>{
//             state = cartItem.foodId
//     })
//     if(state === newCartFood.foodId){
//         msg="inCart"
//         setTimeout(() => {
//             msg=""
//         }, 2000);
//         // console.log("hello")
//         // console.log(cartDatabase)
//     }else{
//         if(req.session.name){
//             let userSession = uses.find(user=> 
//             req.session.name ===  user.name)
//             userSession.cartContent.push(newCartFood)
//             console.log(userSession.cartContent.length)
//             lengthParent = 0 || userSession.cartContent.length
//             res.redirect("/foods")
//         }else if(!req.session.name){
//            res.redirect("/login")
//         }
//     }

})

// THINGS IM DOUING NEXT
// CHNAGING THE VALIDATION SYSTEM TO USE EMAIL AND NOT USERNAME
// VERIFY THAT AN ITEM IS NOT IN THE CART BEFORE ADDING
// AFTER THE CHECKOUT BUTTON IS PRESSED, REDIRECT TO A BLANK PAGE THAT SHOWS USER EMAIL, PHONE NUMBER


app.get("/cart/del/:name",routeProtect, (req, res) =>{
    Storeitems.find({Itemname:req.params.name}).then((re)=>{
        if(re.length != 0){
            Users.updateOne({Name:req.session.name},{$pull:{Cartcontent:{Itemname:re[0].Itemname,Itemprice:re[0].Itemprice, Itemimage:re[0].Itemimage}}}).then((result, err)=>{
                // console.log(result)
                res.redirect("/cart")
            })  
        }else{
            res.redirect("/errorpage")
            // console.log("No result Found")
        }
        
    })
})
app.get("/checkout", (req,res)=>{
    Users.find({Name:req.session.name}).then((re,err)=>{
        if(re.length != 0){
            var cartitems = re[0].Cartcontent
            var total = 0;
            // var numberofitemsincart = cartitems.length
            for(var i = 0; i<cartitems.length; i++){
                total = total + cartitems[i].Itemprice
            }
            // res.render('cart.ejs',{name:req.session.name, noofitems:numberofitemsincart, data:result[0].Cartcontent, itemstotal:total})
            // total.forEach(element => {
        }else{
            // res.render('cart.ejs',{name:req.session.name})
            // console.log("NO ONE LOGGED IN")
        }
        var Email = re[0].Email
        var Name = re[0].Name
        var Length = cartitems.length
        var Amount = total
        res.render("checkout.ejs", {name:Name,length:Length, email:Email, amount:Amount})
    })
})





app.get("/pay", (req,res)=>{
    Users.find({Name:req.session.name}).then((re,err)=>{
        if(re.length != 0){
            var cartitems = re[0].Cartcontent
            var total = 0;
        }
        for(var i = 0; i<cartitems.length; i++){
            total = total + cartitems[i].Itemprice
        }
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4000/success",
            "cancel_url": "http://localhost:4000/cancel"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total,
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if(payment.links[i].rel === "approval_url"){
                    res.redirect(payment.links[i].href)
                }
                
            }
        }
    });
        })
});
app.get("/success",(req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    
    Users.find({Name:req.session.name}).then((re,err)=>{
        if(re.length != 0){
            var cartitems = re[0].Cartcontent
            var total = 0;
        }
        for(var i = 0; i<cartitems.length; i++){
            total = total + cartitems[i].Itemprice
        }

    const execute_payment_json = {
        "payer_id":payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]

    }

    paypal.payment.execute(paymentId,execute_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Payment Response")
            console.log(JSON.stringify(payment));
            res.send("success")
        }
    });
})
})

app.get("/cancel",(req,res)=>{
    res.send("cancel")
})

app.get("/errorpage", (req,res)=>{
    Users.find({Name:req.session.name}).then((result,err)=>{
        if(result.length != 0){
            var cartitems = result[0].Cartcontent
            var total = 0;
            var numberofitemsincart = cartitems.length
            res.render("errorpage.ejs",{name:req.session.name, noofitems:numberofitemsincart})
        }else{
            res.render("errorpage.ejs",{name:req.session.name})
        }
    })
});
app.get("/carts/js", (req,res)=>{
    res.render("artstoredetailspage.ejs")
});
app.get("/portfolio/:name", (req,res)=>{
    Photomodels.find({Modelname:req.params.name}).then((result)=>{
        if(result.length != 0) {
            res.render("indportfolio.ejs",{name:req.session.name,data: result[0]})
        }else{
            res.render("errorpage.ejs")
        } 
    })
})
app.get("/portfolio/delete/:name", (req,res)=>{
    var model = models.find(mod=>
        mod.name ===  req.params.name   
        )
    if(model) {
        let new_array = models.filter(function(value) {
            return value !== model ; });
            models = new_array
            // console.error(new_array)
        // models.filter(c=> c.name !== model.name)
    res.redirect("/portfolio")
    }else{
    res.render("errorpage.ejs")
    } 
})
app.get("/portfolio/edit/:name", (req,res)=>{
    var model = models.find(mod=>
        mod.name ===  req.params.name   
        )
    if(model) {
        model.name = req.query.url
    res.redirect("/portfolio")
    }else{
    res.render("errorpage.ejs")
    } 
    // 0356850879
})
app.get("/portfolio", (req,res)=>{
    Photomodels.find({}).then((result)=>{
        res.render("portfolio.ejs", {data:result,name:req.session.name})
    })
})
app.get("/photography-website", (req,res)=>{
    Users.find({Name:req.session.name}).then((result,err)=>{
        if(result.length != 0){
            var cartitems = result[0].Cartcontent
            var total = 0;
            var numberofitemsincart = cartitems.length
            res.render("photography-website.ejs",{noofitems:numberofitemsincart, name:req.session.name})
        }else{
            res.render("photography-website.ejs",{name:req.session.name})
        }
        })
})
app.get("/register", (req,res)=>{
    
    res.render("registrationpage.ejs",{msg:""})
})
app.post("/register", (req,res)=>{
    var userinfo = req.body
    var newUser = new Users({
        Name:userinfo.Username,
        Email:userinfo.Email,
        Phonenumber:userinfo.Number,
        Cartcontent:[],
        Password:userinfo.Password
    })
    Users.find({Email:userinfo.Email}).then((result)=>{
        if(result.length != 0){
            res.render("registrationpage.ejs",{msg:"Sorry That Email Already Exist"})
        }else{
            newUser.save().then(()=>{
                res.redirect("/login")
            })
        }
    })
    
})
app.get("/login", (req,res)=>{
    res.render("adminlogin.ejs",{msg:""})
})
app.post("/login", (req,res)=>{
    var userinfo = req.body
    Users.find({Email:userinfo.Email}).then((result,err)=>{
        if(result.length != 0){
            if(result[0].Password == userinfo.Password){
                req.session.name = result[0].Name
                req.session.email = result[0].Email
                res.redirect("/")
            }else{
                res.render("adminlogin.ejs",{msg:"Incorrect Details !!!"})
            }   
        }else{
            res.render('adminlogin.ejs', {msg:"Incorrect Details !!!"})
            
        }
})
})
app.get("/detailspage", (req,res)=>{
    res.render("detailspage.ejs")
})
app.get("/contact", (req,res)=>{
    res.render("contact.ejs")
})
app.get("/paymentpage", (req,res)=>{
    res.render("paymentpage.ejs")
})
app.get("*", (req,res)=>{
    Users.find({Name:req.session.name}).then((result,err)=>{
        if(result.length != 0){
            var cartitems = result[0].Cartcontent
            var total = 0;
            var numberofitemsincart = cartitems.length
            res.render("errorpage.ejs",{name:req.session.name, noofitems:numberofitemsincart})
        }else{
            res.render("errorpage.ejs",{name:req.session.name})
        }
    })
})



// var createPay = payment => {
//     return new Promise((resolve, reject) => {
//       paypal.payment.create(payment, function(err, payment) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(payment);
//         }
//       });
//     });
//   };

  

app.listen(PORT,()=>{
    console.log(PORT)
})
