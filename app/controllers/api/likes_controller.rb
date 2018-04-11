class Api::LikesController < ApplicationController
    before_action :authenticate_user!


    def update
        like = Like.find(params[:id])
        like.update!(like_params)
        @definition = Definition.find(params[:definition_id])
        render json: @definition, include: :likes
    end


    private
    def like_params
        params.require(:like).permit(:liked, :disliked)
    end
end
