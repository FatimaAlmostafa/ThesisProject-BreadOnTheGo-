import React from 'react';
import { Button,  Panel, ListGroupItem, PanelGroup, FormControl, FormGroup } from 'react-bootstrap';
import Rating from './Rating.jsx'
class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value:'',
      products:[]
    }
    this.handleChange=this.handleChange.bind(this);
    this.getItem=this.getItem.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  handleChange(e){
    this.setState({value:e.target.value})
  }

  handleSelect(activeKey){
    this.setState({activeKey});
  }

  componentDidMount() {
    var that = this;
    $.ajax({
      url: '/showProduct',
      method: 'GET',
    })
    .done (function (data) {
      console.log(data)
      that.setState({
        products: data
      });
    })
    .fail(function( jqXHR, textStatus ) {
      alert( "no products found");
    });
  }

  getItem(){
    var that=this;
    console.log(this.state.value)
    $.ajax({
      type:'GET',
      url:'/showProduct',
      success:function(data){
        console.log(data)
        var x=[];
        for(var i=0;i<data.length;i++){
          if(data[i].name===that.state.value){
            x.push(data[i])
          }

        }
         that.setState({products:x})
          console.log('products= ', that.state.sItem)
      }
    })
  }

///make the order ///
handleClick(event){

  $.ajax ({
    type: 'POST',
    url: '/showProduct',
    data: {
      name: y.name,
      price: y.price
    },
    success: (data) => {
      console.log('order added',data)
      alert('Added to Your Cart');
    },
    error:(err) => {
      console.log('Failed in adding product to the Cart',err);
    }
  });
  event.preventDefault();
}


  render(){
    var r=this;
    return(
      <div>

        <FormGroup bsSize="large">
          <FormControl
            value={this.state.value}
            placeholder="Search"
            onChange={this.handleChange}
          />
        </FormGroup>
      <Button  onClick={this.getItem}>SEARCH</Button>

      <div activeKey={this.state.activeKey}
        onSelect={this.handleSelect}/>
      {this.state.products.map(function(y){
        return(
          <div>


          <div  id="border" >
           <h1>Product Name : {y.name}</h1>
           <h1>Price : {y.price} </h1>
           <h1>Description : {y.description} </h1>
           <h1><img src={y.image}  thumbnail style={{weight : 50 , height : "60px"}} /></h1>
           <button type ='button' onClick= {this.handleClick} >Add to Cart</button>
           <div> <Rating/></div>
           </div>
         <div>
          <hr/>
           <hr/>
           </div>
            </div>
        )
      }
      )}
      </div>


    )
  }

}
export default SearchProduct;
