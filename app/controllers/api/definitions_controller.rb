class Api::DefinitionsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    topic = Topic.find(params[:topic_id])
    @definitions = topic.definitions.all
    render json: @definitions
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
    render json: @definition
  end

  def update

  end

  def destroy
  end

  private
  def definition_params
    params.require(:definition).permit(:post)
  end
end
