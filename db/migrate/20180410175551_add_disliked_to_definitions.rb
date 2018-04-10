class AddDislikedToDefinitions < ActiveRecord::Migration[5.1]
  def change
    add_column :definitions, :disliked, :boolean
  end
end
