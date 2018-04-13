class RemoveLikeAndDislikedFromDefinitions < ActiveRecord::Migration[5.1]
  def change
    remove_column :definitions, :liked, :boolean
    remove_column :definitions, :disliked, :boolean
  end
end
