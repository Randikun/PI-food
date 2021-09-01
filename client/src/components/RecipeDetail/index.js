import React from 'react';
import { connect } from 'react-redux';

import getRecipeDetail from '../../actions/getRecipeDetail';


class RecipeDetail extends React.Component {

   componentDidMount(){
       this.props.getRecipeDetail(this.props.match.params.id)
   }

    render() {
        return (
           
            <div >
                {
                    this.props.recipeDetail ? 
                    <div>
                    <div>
                        <span>Title</span>
                        <span>{this.props.recipeDetail.title}</span>
                        <span>Summary</span>
                        <span>{this.props.recipeDetail.summary}</span>
                        <span>score</span>
                        <span>{this.props.recipeDetail.score}</span>
                        <span>healthiness</span>
                        <span>{this.props.recipeDetail.healthiness}</span>
                        <span>steps</span>
                        <span>{this.props.recipeDetail.steps}</span>
                        <span>diets</span>
                        <span>{this.props.recipeDetail.diets.map(diet=>diet.name)}</span>
                        
                    </div>
                    <img src={this.props.recipeDetail.image} alt="img"/>
                    </div>
                :<h3>Cargando</h3>
                
                 } 
            </div>
                
        );
    
    }
    
}

function mapStateToProps(state){
    return{
        recipeDetail: state.recipeDetail
    }
}


export default connect(mapStateToProps, {getRecipeDetail})(RecipeDetail);