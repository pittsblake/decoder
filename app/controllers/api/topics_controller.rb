class Api::TopicsController < ApplicationController
  def index
    @topics = Topic.all
    render json: @topics
  end

  def show
    @topic = Topic.find(params[:id])
    render json: @topic
  end

  def create
    @topic = Topic.new(topic_params)

    @topic.save!
    render json: @topic
  end

  def destroy
    @topic = Topic.find(params[:id]).destroy
    render json: {msg: "Deleted!"}
  end


  private 
  def topic_params
    params.require(:topic).permit(:title)
  end
end
