class AddCountToDefinitions < ActiveRecord::Migration[5.1]
  def change
    add_column :definitions, :count, :integer
  end
end
