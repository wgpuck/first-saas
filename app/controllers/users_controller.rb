class UsersController < ApplicationController
	def show
		#use id instead of user_id based on the url format (just has :id, not :user_id)
		@user = User.find( params[:id] )
	end
end