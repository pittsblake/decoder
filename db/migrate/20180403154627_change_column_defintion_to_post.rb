class ChangeColumnDefintionToPost < ActiveRecord::Migration[5.1]
  def change
    rename_column :definitions, :definition, :post

  end
end
