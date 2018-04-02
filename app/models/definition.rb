class Definition < ApplicationRecord
  belongs_to :user
  belongs_to :topic
  has_many :ratings, dependent: :destroy
end
