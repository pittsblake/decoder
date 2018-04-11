Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth'
   namespace :api do
    resources :topics do 
      resources :definitions do
        resources :likes 
      end
    end
  end
end
