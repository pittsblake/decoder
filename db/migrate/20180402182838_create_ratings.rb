class CreateRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :ratings do |t|
      t.integer :like
      t.references :user, foreign_key: true
      t.references :definition, foreign_key: true

      t.timestamps
    end
  end
end
