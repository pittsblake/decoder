class Api::TopicsController < ApplicationController
  def index
    @topics = Title.all
    render json: @topics
  end

  def show
  end

  def create
  end
end
