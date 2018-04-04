class Api::RatingsController < ApplicationController
    before_action :authenticate_user!

    def index 
        definition = Definition.find(params[:definition_id])
        @ratings = definition.ratings.all 

        render json: @ratings
    end


end
