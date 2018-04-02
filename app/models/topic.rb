class Topic < ApplicationRecord
    has_many :definitions, dependent: :destroy
end
