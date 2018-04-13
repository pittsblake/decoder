class Api::LikesController < ApplicationController
    before_action :authenticate_user!

    def index
        definition = Definition.find(params[:definition_id])
        @likes = definition.likes.all 
        render json: @likes
    end

    def update
        like = Like.find(params[:id])
        like.update!(like_params)
        @definition = Definition.find(params[:definition_id])
        render json: @definition, include: :likes
    end

    def create
        @definition = Definition.find(params[:definition_id])
        @user = current_user

        @like = Like.new(like_params)

        @definition.likes << @like
        @user.likes << @like

        @definition.save!
        @user.save!

        render json: @like
    end


    private
    def like_params
        params.require(:like).permit(:liked, :disliked)
    end
end
