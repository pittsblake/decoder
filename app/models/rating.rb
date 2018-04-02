class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :definition
end
