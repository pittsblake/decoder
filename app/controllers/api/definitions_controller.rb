class Api::DefinitionsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource  only: [:destroy]

  def index
    topic = Topic.find(params[:topic_id])
    @definitions = topic.definitions.all.order(count: :desc)
    render json: @definitions, include: :likes
    
  end

  def show
  end

  def create
    @topic = Topic.find(params[:topic_id])
    @user = current_user

    @definition = Definition.new(definition_params)

    @topic.definitions << @definition
    @user.definitions << @definition
    
    @topic.save!
    @user.save!
    render json: @definition, include: :likes
  end

  def update
    definition = Definition.find(params[:id])
    definition.update!(definition_params)
    topic = Topic.find(params[:topic_id])
    @definitions = topic.definitions.all.order(count: :desc)
    render json: @definitions
  end

  def destroy
    @user = current_user
    @definition = Definition.find(params[:id]).delete

    render json: {
      msg: "Definition deleted"
    }
  end

  private
  def definition_params
    params.require(:definition).permit(:post, :count, :liked, :disliked)
  end
end
