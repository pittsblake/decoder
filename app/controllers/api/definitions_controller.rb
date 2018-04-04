class Api::DefinitionsController < ApplicationController
  before_action :authenticate_user!

  def index
    topic = Topic.find(params[:topic_id])
    @definitions = topic.definitions.all
    render json: @definitions, include: [:ratings]
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
    @definition = Definition.find(params[:id])
    @definition.update!(definition_params)
    render json: @definition
  end

  def destroy
    @definition = Definition.find(params[:id])
    @definition.delete

    render json: {
      msg: "Definition deleted"
    }
  end

  private
  def definition_params
    params.require(:definition).permit(:post, :count)
  end
end
