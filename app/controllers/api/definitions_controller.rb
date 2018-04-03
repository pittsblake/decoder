class Api::DefinitionsController < ApplicationController
  def index
    topic = Topic.find(params[:topic_id])
    @definitions = topic.definitions.all
    render json: @definitions
  end

  def show
  end

  def create
    # @topic = Topic.find(params[:topic_id])
    # @user = User.first

    @definition = Definition.new(definition_params)

    # @topic.definitions << @definition
    # @user.definitions << @definition
 
    @definition.save!
    # @topic.save!
    # @user.save!

    render json: @definition
  end

  def update
  end

  def destroy
  end

  private
  def definition_params
    params.require(:definition).permit(:definition)
  end
end
